use crate::*;
use near_sdk::{
    log
};

#[near_bindgen]
impl Contract {
    /// Query for NFT tokens on the contract regardless of the owner using pagination
    pub fn nft_tokens(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<JsonToken> {
        let keys = self.token_metadata_by_id.keys_as_vector();

        let start = u128::from(from_index.unwrap_or(U128(0)));                              // Start from `from_index` or 0

        keys.iter()
            .skip(start as usize) 
            .take(limit.unwrap_or(0) as usize)                                              // Take `limit` elements (or 0)
            .map(|token_id| self.nft_token(token_id.clone()).unwrap())
            .collect()
    }

    /// Query for NFT tokens on the contract regardless of the owner using pagination
    pub fn nft_token_details(&self, token_id: TokenId) -> Vec<JsonToken> {
        let mut wrapper_vec = Vec::new();
        wrapper_vec.push(self.nft_token(token_id.clone()).unwrap());
        wrapper_vec
    }

    pub fn state_check(&self) -> String {
        for i in 0..64 {
            if env::storage_has_key(&[i]) {
                log!("Has key: {:?}", i);
            }
        }
        let byteArray: Vec<u8> = env::storage_read(&[4]).unwrap();
        let base64String = Base64VecU8(byteArray);
        log!("contract: {:?}", base64String);
        "return".to_string()
    }

    pub fn state_check2(&self) -> String {
        let x: Vec<u8> = env::state_read().unwrap();
        let base64String = Base64VecU8(x);
        log!("contract: {:?}", base64String);
        "return".to_string()
    }

    pub fn state_check3(&self) -> String {
        for i in 0..8000 {
            if env::register_len(i) != None {
                log!("Using register: {:?}", i);
            }
        }
        //let x = env::read_register(0).unwrap();
        //let base64String = Base64VecU8(x);
        //log!("contract: {:?}", base64String);
        "return".to_string()
    }

    /// Get the total supply of NFTs for a given owner (a number)
    pub fn nft_supply_for_owner(
        &self,
        account_id: AccountId,
    ) -> U128 {
        let tokens_for_owner_set = self.tokens_per_owner.get(&account_id);
    
        if let Some(tokens_for_owner_set) = tokens_for_owner_set {
            U128(tokens_for_owner_set.len() as u128)
        } else {
            U128(0)
        }
    }

    /// Query for all the tokens for an owner
    pub fn nft_tokens_for_owner(
        &self,
        account_id: AccountId,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<JsonToken> {
        let tokens_for_owner_set = self.tokens_per_owner.get(&account_id);                 // Get the set of tokens for the passed in owner
        let tokens = if let Some(tokens_for_owner_set) = tokens_for_owner_set {
            tokens_for_owner_set
        } else {
            return vec![];
        };
        let keys = tokens.as_vector();

        let start = u128::from(from_index.unwrap_or(U128(0)));

        keys.iter()
            .skip(start as usize) 
            .take(limit.unwrap_or(0) as usize) 
            .map(|token_id| self.nft_token(token_id.clone()).unwrap())
            .collect()
    }

    /// Get the next NFT that can be bought from a given root
    pub fn get_next_buyable(&self, root_id: TokenId) -> TokenId {
        log!("root_id: {}", &root_id);
        let root_meta = self.token_metadata_by_id.get(&root_id.clone());
        let root_extra: Extra = serde_json::from_str(&root_meta.unwrap().extra.unwrap()).unwrap();
        
        let mut lowest_id = "".to_string();
        let mut lowest = 999_999;
        for i in 0..root_extra.instance_nounce {
            let id = root_id.to_string() + "-" + &i.to_string();
            if self.tokens_by_id.get(&id).unwrap().owner_id == env::current_account_id() {           // If the token is in the Vault ...
                let instance_meta = self.token_metadata_by_id.get(&id).unwrap();
                let instance_extra: Extra = serde_json::from_str(&instance_meta.extra.unwrap()).unwrap();
                if instance_extra.generation < lowest {                                              // ... we check if it has the lowest generation
                    lowest = instance_extra.generation;                                              // We first sell the first generation, then the second, and so on
                    lowest_id = id;
                }
            }
        }

        lowest_id
    }

    /// Get the RootNFT from given token ID.
    pub fn get_root(&self, start_id: TokenId) -> TokenId {
        let mut searched_token_id = start_id;
        loop {
            let current_metadata = self.token_metadata_by_id.get(&searched_token_id.to_owned()).unwrap();
            let current_extra_obj: Extra = serde_json::from_str(&current_metadata.extra.unwrap()).unwrap();
            match current_extra_obj.parent {
                Some(current_parent) => searched_token_id = current_parent,
                None => break,
            }
            env::log_str(&format!("Loop").to_string());
        }

        searched_token_id
    }
}