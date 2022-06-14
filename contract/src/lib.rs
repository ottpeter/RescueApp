use std::collections::HashMap;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::{
    env, log, near_bindgen, AccountId, Balance, CryptoHash, PanicOnDefault, Promise, PromiseOrValue, ext_contract, Gas
};

use crate::internal::*;
pub use crate::metadata::*;
pub use crate::mint::*;
pub use crate::nft_core::*;
pub use crate::approval::*;
pub use crate::royalty::*;
pub use crate::events::*;
pub use crate::crust::*;
pub use crate::buy::*;
pub use crate::transfer::*;
pub use crate::guestbook::*;
pub use crate::withdraw::*;
pub use crate::revenue::*;
pub use crate::migration::*;

mod internal;
mod approval; 
mod enumeration; 
mod metadata; 
mod mint; 
mod nft_core; 
mod royalty; 
mod events;
mod crust;
mod buy;
mod transfer;
mod guestbook;
mod withdraw;
mod revenue;
mod migration;


#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests;

/// This spec can be treated like a version of the standard.
pub const NFT_METADATA_SPEC: &str = "1.0.0";
/// This is the name of the NFT standard we're using
pub const NFT_STANDARD_NAME: &str = "nep171";

pub type SalePriceInYoctoNear = U128;                                                      // Price in NEAR

#[ext_contract(ext_contract_orig)]
pub trait OrigContract {                                                                   // The original contract, from which we will copy
    fn nft_tokens(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<JsonToken>;  //   (in case of migration)
}

#[ext_contract(ext_self)]                                                                  // Callbacks for the cross-origin contract call
pub trait LocalContract {
    fn migration_callback(&self);
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {    
    pub owner_id: AccountId,                                                               // Contract owner. This is the Vault
    pub admin: AccountId,                                                                  // Account that can create new RootNFTs and withdraw funds
    pub root_nonce: u128,                                                                  // We will use this for the creation of the `token_id`
    pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,                     // Keeps track of all the token IDs for a given account
    pub tokens_by_id: LookupMap<TokenId, Token>,                                           // Keeps track of the token struct for a given token ID
    pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,                        // Keeps track of the token metadata for a given token ID
    pub metadata: LazyOption<NFTContractMetadata>,                                         // Keeps track of the metadata for the contract (not metadata for NFT)
    pub crust_key: String,                                                                 // The encrypted private key for the Crust Network
    pub guestbook: Vec<GuestBookEntry>,                                                    // The Guestbook is an array of entry objects
}

/// Helper structure for keys of the persistent collections.
#[derive(BorshSerialize)]
pub enum StorageKey {
    TokensPerOwner,
    TokenPerOwnerInner { account_id_hash: CryptoHash },
    TokensById,
    TokenMetadataById,
    NFTContractMetadata,
    TokensPerType,
    TokensPerTypeInner { token_type_hash: CryptoHash },
    TokenTypesLocked,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new_default_meta(owner_id: AccountId, admin: AccountId) -> Self {
        log!("Default initialization function called.");
        Self::new(
            owner_id,
            admin,
            NFTContractMetadata {
                spec: "nft-1.0.0".to_string(),
                name: "SPLASH".to_string(),
                symbol: "SPLASH".to_string(),
                icon: Some("https://bafkreiavs3lq4vcbd3zo6dnaztwxfgs4wl7s6jvo5chxu45qthw2ddqgfu.ipfs.nftstorage.link/".to_string()),
                base_uri: None,
                reference: None,
                reference_hash: None,
            },
        )
    }

    #[init]
    pub fn new(owner_id: AccountId, admin: AccountId, metadata: NFTContractMetadata) -> Self {
        log!("Initializing contract instance...");
        let this = Self {
            // Storage keys are simply the prefixes used for the collections. This helps avoid data collision
            tokens_per_owner: LookupMap::new(StorageKey::TokensPerOwner.try_to_vec().unwrap()),
            tokens_by_id: LookupMap::new(StorageKey::TokensById.try_to_vec().unwrap()),
            token_metadata_by_id: UnorderedMap::new(
                StorageKey::TokenMetadataById.try_to_vec().unwrap(),
            ),
            // Set the owner_id field equal to the passed in owner_id. 
            owner_id,
            admin,
            root_nonce: 0,
            metadata: LazyOption::new(
                StorageKey::NFTContractMetadata.try_to_vec().unwrap(),
                Some(&metadata),
            ),
            crust_key: "".to_string(),
            guestbook: Vec::new()
        };

        this
    }

    /// The function will copy the state of an existing contract
    /// * `orig`: account id of the original contract, from which we will copy the values
    /// * `from_index`: from_index for nft_tokens
    /// * `amount`: amount to copy from index
    #[payable]
    pub fn copy(orig: AccountId, from_index: U128, amount: u64) {
        log!("Copying NFTS based on the state of an existing contract...");

        ext_contract_orig::nft_tokens(
            Some(from_index), 
            Some(amount),
            orig,
            0, // yocto NEAR to attach
            Gas(100_000_000_000_000) // gas to attach
        )
        .then(ext_self::migration_callback(
            env::current_account_id(), // this contract's account id
            0, // yocto NEAR to attach to the callback
            Gas(100_000_000_000_000) // gas to attach to the callback
        ));
    }
}