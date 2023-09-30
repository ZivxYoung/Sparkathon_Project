import React from "react";
import styles from "../styles/Home.module.css"; // Replace with the correct path
import { useEffect, useState} from 'react'
import { getProgramInstance } from "../../utils/utils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SOLANA_HOST } from "../../utils/const";   // endpoint using quicknode
import { useWallet } from "@solana/wallet-adapter-react";
import { UserWallet } from "@thirdweb-dev/sdk";

const anchor = require('@project-serum/anchor')

// something or web3 from anchor ..
const { web3 } = anchor // distructure an object (we want web3) (like import also distruction)
const { SytemProgam} = web3
const utf8 = anchor.utils.bytes.utf8

const defaultAccounts = {       // this one must de format
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,  // get the clock from key
    systemProgram: SytstemProgram.programId,
}

// const styles = {

// }

const Payment = () => {
    const wallet = UseWallet()
    const connection = new anchor.web3.Connection(SOLANA_HOST)
    const program = getProgramInstance(connection, wallet)
    const [payers, setPayers] = useState([])    // keep tracks of evry payers that used our platform
    const [isPaid, setPaid] = useState(false)  // look through user existed in payers array or not if yes then put in here (paid)


  return (
    <div className={styles.main}>
      <p className={styles.text}>Make Payment</p>
    </div>
  );
};

export default Payment;
