use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

pub mod constant;
pub mod states;

// // crate = npm (like a package)
use crate::{constant::*, states::*};

// our program's publickey (will update automatically when build project)
declare_id!("5eVMMxzdFuZKw3Yz5nQ3d5sf3cZbwpo4RrMzhzCAakrV");

// define program
#[Program]
mod funding_platform {
    use super::*;

    pub fn accept_payment(ctx: Context<PayerContext>) -> ProgramResult {
        // ctx is type (Context<PayerContext>) PayerContext comes from below

        // see usecase (Entry PAYMENT FOR APP)
        let payer_wallet = &mut ctx.accounts.payer_wallet;
        payer_wallet.wallet = ctx.accounts.authority.key(); // value of the PayerAccount, .wallet comes from payerAccount Struct

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.authority.key(),
            &ctx.accounts.receiver.key(),
            10000000,
        ); // how much should pay

        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.receiver.to_account_info(),
            ],
        )
    }
}

#[derive(Accounts)]
pub struct PayerContext<'info> {
    #[account(
        init,
        seeds = [b"payer".as_ref(), authority.key().as_ref()],       // generate unique hash based on the seed
        bump,                                                       // bump will increment the hash to create unique (like id += 1)
        payer = authority,                                          // whos paying for the smart contract => authority
        space = size_of::<PayerAccount>()+8
        )] // in Rust, is a must to know the space
    pub payer_wallet: Account<'info, PayerAccount>,

    #[account(mut)]
    pub receiver: AccountInfo<'info>,

    // Authority (signer who paid transaction fee, authority = signer)// let it become mut, this authority can change (mut = not constant)
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: UncheckedAccount<'info>,

    // Token Program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

#[account]
pub struct PayerAccount {
    pub wallet: Pubkey,
}
