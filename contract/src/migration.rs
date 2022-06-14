use crate::*;
use near_sdk::{
    log, PromiseResult
};

#[near_bindgen]
impl Contract {
    pub fn migration_callback(&mut self) {
        assert_eq!(
            env::promise_results_count(),
            1,
            "This is a callback method"
        );
        log!("Inside migration_callback...");

        // handle the result from the cross contract call this method is a callback for
        match env::promise_result(0) {
            PromiseResult::NotReady => unreachable!(),
            PromiseResult::Failed => panic!("goodBye"),
            PromiseResult::Successful(result) => {
                log!("Inside Successful Promise...");
                let result: Vec::<JsonToken> = near_sdk::serde_json::from_slice::<Vec::<JsonToken>>(&result).unwrap();
                
                for current_json_token in result {
                    if self.tokens_by_id.contains_key(&current_json_token.token_id) {
                        continue;   // Do not add tokens that we already have!
                    }

                    let mut new_token = Token {
                        owner_id: current_json_token.owner_id.clone(),
                        approved_account_ids: current_json_token.approved_account_ids.clone(),
                        next_approval_id: 0,
                        royalty: current_json_token.royalty.clone(),
                        revenue: current_json_token.revenue.clone(),
                    };
                    let extra: Extra = serde_json::from_str(&current_json_token.metadata.extra.clone().unwrap()).unwrap();
                    if extra.parent == None {
                        self.root_nonce = self.root_nonce + 1;
                    }
                    if current_json_token.metadata.media == Some("QmcseQ65KWXmud2Lsj2fJgA3jVAagAqTQXo38ckrXZQpz3".to_string()) {
                        let temp_royalty = new_token.royalty;
                        new_token.royalty = new_token.revenue;
                        new_token.revenue = temp_royalty;
                    }

                    self.tokens_by_id.insert(&current_json_token.token_id, &new_token);
                    self.internal_add_token_to_owner(&current_json_token.owner_id.clone(), &current_json_token.token_id);
                    self.token_metadata_by_id.insert(&current_json_token.token_id, &current_json_token.metadata);
                }

                log!("root nonce: {:?}", self.root_nonce);
            },
        }
    }
}