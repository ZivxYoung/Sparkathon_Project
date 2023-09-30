// this file is to hold the anchor clients
import * as anchor from '@project-serum/anchor'
import { WalletNotConnctedError } from '@solana/wallet-adapter-base'
import { STABLE_POOL_IDL, STABLE_POOL_PROGRAM_ID } from './const'   // IMPORT IDL AND PROGRAMID

export function getProgramInstance(connection, wallet) {
    if(!wallet.publicKey) throw new WalletNotConnctedError
        
    const provider = new anchor.Provider(
        connection,
        wallet,
        anchor.Provider.defaultOptions()
    )
    
    const idl = STABLE_POOL_IDL

    const programId = STABLE_POOL_PROGRAM_ID

    const program = new anchor.Program(idl, programId. provider)    // new program client require these

    return program
}