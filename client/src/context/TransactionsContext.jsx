import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount") || 0
  );
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  //FORM DATA CHANGE HANDLING
  const handleChange = (e, name) => {
    setFormData((prevSate) => ({ ...prevSate, [name]: e.target.value }));
  };

  //Check if user wallet is connected
  const userWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) setCurrentAccount(accounts[0]);
      else console.log("no accounts found");
    } catch (error) {
      console.log(error);

      throw new Error("no ethereum object");
    }
  };

  //CONNECT TO ACCOUNT
  const connectAccount = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("no ethereum object");
    }
  };

  //SEND TRANSACTIONS
  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });

        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount =
          await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        // window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  //CALL userWalletConnected FUNCTION
  useEffect(() => {
    userWalletConnected();
  }, []);

  //PROVIDER VALUES
  const providerValues = {
    connectAccount,
    currentAccount,
    handleChange,
    formData,
    sendTransaction,
    isLoading,
  };

  return (
    <TransactionsContext.Provider value={providerValues}>
      {children}
    </TransactionsContext.Provider>
  );
};
