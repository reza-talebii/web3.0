import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const TransactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log(provider, signer, TransactionsContract);
};



export const TransactionsProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  //Check if user wallet is connected
  const userWalletConnected = () => {
    if(!ethereum) return alert("Please install metamask");

    const accounts = await ethereum.request({ method: "eth_account" });

    console.log(accounts);
  } 

  //CONNECT TO ACCOUNT
  const connectAccount = async () => {
    try {
      if(!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setConnectedAccount(accounts[0]);
    
    } catch (error) {
        console.log(error);

        throw new Error('no ethereum object');
    }
  }



  useEffect(() => userWalletConnected,[])

  return (
    <TransactionsContext.Provider value={{ connectAccount }}>
      {children}
    </TransactionsContext.Provider>
  );
};
