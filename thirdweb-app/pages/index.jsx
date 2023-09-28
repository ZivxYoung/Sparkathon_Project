import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {useWallet} from '@solana/wallet-adapter-react'
import { Wallet } from '@project-serum/anchor'
import  Payment  from '../components/Payment' // Use relative import


// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);



const Login = () => {

  const wallet = useWallet()    // check the wallet that connecting

  if (wallet.connected) return <Payment/>
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1}>Welcome to GGLOL Crowdfunding Website 👋</h1>
        

        <WalletMultiButtonDynamic />
      </div>
    </>
  );
};

export default Login;
