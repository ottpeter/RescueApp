use crate::*;

#[near_bindgen]
impl Contract {
    /// `mint_root` will mint a new root NFT, that has a unique music attached to it (IPFS CID),
    /// will automatically mint 2 children. The root NFT goes to `receiver_id`, the 2 children go to Vault.
    /// `perpetual_royalties` is not used yet.
    #[payable]
    pub fn mint_root(
        &mut self,
        metadata: TokenMetadata,
        receiver_id: AccountId,
        children_price: SalePriceInYoctoNear,
        perpetual_royalties: Option<HashMap<AccountId, u32>>,
        revenue_table: Option<HashMap<AccountId, u32>>,
    ) {
        log!("Starting MintRoot...");

        assert_eq!(
            self.admin, 
            env::predecessor_account_id(),
            "Only admin can mint new Root-NFTs!"
        );

        let initial_storage_usage = env::storage_usage();                                       // Take note of initial storage usage for refund
        let mut royalty = HashMap::new();                                                       // Create royalty map to store in the token
        let mut revenue = HashMap::new();                                                       // Create revenue map, this is one-time payout, royalty is applied at every transfer where marketplace has this function

        if let Some(perpetual_royalties) = perpetual_royalties {
            assert!(perpetual_royalties.len() < 7, "Cannot add more than 6 perpetual royalty amounts");
            let mut total = 0;
    
            for (account, amount) in perpetual_royalties {
                royalty.insert(account, amount);
                total = total + amount;
                assert!(total <= 10000, "Total royalty amount can not exceed 100%!");
            }
        }

        let mut total = 0;                                                                      // The revenue total always has to add up to 100% (10000),
        if let Some(revenue_table) = revenue_table {                                            // because the Vault itself is also on the Revenue Table
            assert!(revenue.len() < 7, "Cannot add more than 6 revenue entries");

            for (account, amount) in revenue_table {
                revenue.insert(account, amount);
                total = total + amount;
                assert!(total <= 10000, "Total revenue can not exceed 100%!");
            }
        }
        if total < 10000 {
            revenue.insert(env::current_account_id(), 
                revenue.get(&env::current_account_id()).unwrap_or_else(|| &0) + 10000 - total
            );
        }
        log!(" Revenue Table {:?}", revenue);

        let token_id = "fono-root-".to_string() + &self.root_nonce.to_string();                // We generate the ID for the RootNFT. The RootNFT ID only has 1 number in it, like fono-root-22
        self.root_nonce = self.root_nonce + 1;                                                // We increment nonce to avoid collision

        let token = Token {
            owner_id: receiver_id,
            approved_account_ids: Default::default(),
            next_approval_id: 0,
            royalty,
            revenue,
        };

        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists!"
        );


        // Although `instance_nounce` is sent from front-end, we make sure that it's value is 0
        let mut modified_metadata = metadata;
        let mut extra_obj: Extra = serde_json::from_str(&modified_metadata.extra.unwrap()).unwrap();
        extra_obj.instance_nounce = 0;
        extra_obj.generation = 1;                                                               // The Root NFT is the first generation
        extra_obj.original_price = U128(0);                                                     // The Root NFT has no original price
        modified_metadata.extra = Some(serde_json::to_string(&extra_obj).unwrap());

        self.token_metadata_by_id.insert(&token_id, &modified_metadata);                        // Insert new NFT
        self.internal_add_token_to_owner(&token.owner_id, &token_id);

        let nft_mint_log: EventLog = EventLog {                                                 // Construct the mint log as per the events standard.
            standard: NFT_STANDARD_NAME.to_string(),
            version: NFT_METADATA_SPEC.to_string(),
            event: EventLogVariant::NftMint(vec![NftMintLog {
                owner_id: token.owner_id.to_string(),
                token_ids: vec![token_id.to_string()],
                memo: None,
            }]),
        };

        env::log_str(&nft_mint_log.to_string());                                                // Log the serialized json.

        self.create_children(token_id.clone(), token_id, children_price, Some(HashMap::new())); // This has to happen before the refund

        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;
        refund_deposit(required_storage_in_bytes, U128(0));                                     // Refund not-used storage
    }


    /// 'create_children' will mint 2 new NFTs and put them to the Vault
    /// * `token_id` is id of the new token this should be probably generated from inside the contract as well
    /// * `parent` id of the parent NFT
    /// * `new_price` is the price the NFT can be purchased at from Vault
    /// * `perpetual_royalties` probably we won't have this field
    pub(crate) fn create_children( // remove (crate)
        &mut self,
        root: TokenId,
        parent: TokenId,
        new_price: SalePriceInYoctoNear,
        _perpetual_royalties: Option<HashMap<AccountId, u32>>,
    ) {
        log!("Starting CreateChildren...");
        
        for child_num in 0..2 {
            log!("Entering loop...{}", child_num);
            let royalty = self.tokens_by_id.get(&root).expect("No root token!").royalty;
            let revenue = self.tokens_by_id.get(&root).expect("No root token!").revenue;

            // We create the token_id. For this, we need the meta of the root NFT. We need to increment nonce
            let mut root_metadata = self.token_metadata_by_id.get(&root.to_owned()).unwrap();
            let mut root_extra_obj: Extra = serde_json::from_str(&root_metadata.extra.unwrap()).unwrap();
            let token_id = root.clone().to_owned() + &"-".to_string() + &root_extra_obj.instance_nounce.to_string();

            let mut metadata = self.token_metadata_by_id.get(&parent.to_owned()).unwrap();      // Current NFT meta
            let mut extra_obj: Extra = serde_json::from_str(&metadata.extra.unwrap()).unwrap();
            
            extra_obj.parent =  Some(parent.clone());                                           // We write the parent to the current NFT extra
            extra_obj.original_price = new_price.clone();                                       // This is the price that should be paid when first bought from Vault
            
            if extra_obj.generation == 1 {                                                      // If called from mint_root()
                extra_obj.generation = 2; 
            } else if root_extra_obj.instance_nounce > (u32::checked_pow(2, extra_obj.generation).unwrap() -3) {
                extra_obj.generation = extra_obj.generation + 1;                                // 2^Gen-3 is the LastIndex in a generation
            }
              
            metadata.extra = Some(serde_json::to_string(&extra_obj).unwrap());                  // Insert modified metadata into meta field
            //env::log_str(&serde_json::to_string(&extra_obj).unwrap());
            
            root_extra_obj.instance_nounce = root_extra_obj.instance_nounce + 1;                // We increment instance_nounce
            root_metadata.extra = Some(serde_json::to_string(&root_extra_obj).unwrap());
            self.token_metadata_by_id.insert(&root, &root_metadata);                            // Insert back the updated root meta
            //env::log_str(&serde_json::to_string(&root_extra_obj).unwrap());

            let token = Token {
                owner_id: env::current_account_id(),
                approved_account_ids: Default::default(),                                       // This is an individual NFT, all the values should start with 0,
                next_approval_id: 0,                                                            // just like in the Root
                royalty,
                revenue,
            };
    
            assert!(
                self.tokens_by_id.insert(&token_id, &token).is_none(),
                "Token already exists!"
            );
    
            
            
            self.token_metadata_by_id.insert(&token_id, &metadata);                             // Insert new NFT
            self.internal_add_token_to_owner(&token.owner_id, &token_id);                       // &token.owner_id will refer to self (contract)
            
            let nft_mint_log: EventLog = EventLog {                                             // Construct the mint log as per the events standard.
                standard: NFT_STANDARD_NAME.to_string(),                                        // same as with Root
                version: NFT_METADATA_SPEC.to_string(),
                event: EventLogVariant::NftMint(vec![NftMintLog {
                    owner_id: token.owner_id.to_string(),
                    token_ids: vec![token_id.to_string()],
                    memo: None,
                }]),
            };
            
            env::log_str(&nft_mint_log.to_string());                                            // Log the serialized json.    
        }


    }
}