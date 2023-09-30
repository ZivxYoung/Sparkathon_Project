// this file is App.jsx (Video)

import dynamic from "next/dynamic";
import Image from "next/image";
import {useWallet} from '@solana/wallet-adapter-react'
import { Wallet } from '@project-serum/anchor';
import Payment from "./Payment";

// DAO tutorial
import React from 'react';
import ReactDOM from 'react-dom/client';
// import {BrowserRouter as Router} from 'react-router-dom'
import MyApp from "./_app";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { ChainId } from "@thirdweb-dev/sdk";


// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);


const Login = () => {

  const wallet = useWallet()    // check the wallet that connecting

  // if (wallet.connected) return <Payment/>
  return (
    <>
      <div>
        <h1>Welcome to GGLOL Crowdfunding Website 👋</h1>
        <WalletMultiButtonDynamic />
      </div>
    </>
  );
};

export default Login;
