import React, { useEffect, useState } from "react";
import { TransactionsContext } from "./TransactionsContext";
import createEthereumContract from "../utils/createEthereumContract";
import { ethers } from "ethers";

const { ethereum } = window;

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
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

  //GET ALL TRANSACTIONS
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        setTransactions(structuredTransactions);
      } else {
        setError({ title: "Ethereum is not present", descriptionError: "" });
      }
    } catch (error) {
      setError({ title: "No ethereum object", descriptionError: error });
    }
  };

  //Check if user wallet is connected
  const userWalletConnected = async () => {
    try {
      if (!ethereum) {
        setError({ title: "Please install metamask", descriptionError: "" });
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      }
    } catch (error) {
      setError({ title: "No ethereum object", descriptionError: error });
    }
  };

  //CONNECT TO ACCOUNT
  const connectAccount = async () => {
    try {
      if (!ethereum) {
        setError({ title: "Please install metamask", descriptionError: "" });
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      setError({ title: "No ethereum object", descriptionError: error });
    }
  };

  //SEND TRANSACTIONS
  const sendTransaction = async () => {
    try {
      if (ethereum && currentAccount) {
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
        window.location.reload();
      } else {
        setError({
          title: "please connect your wallet",
          descriptionError: 'click on "Connected wallet" button',
        });
      }
    } catch (error) {
      setError({ title: "No ethereum object", descriptionError: error });
    }
  };

  //CHECK IF TRANSACTIONS EXIST
  const checkTransactionExist = async () => {
    try {
      const transactionsContract = createEthereumContract();
      await transactionsContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      // setError({ title: "No ethereum object", descriptionError: error });
      console.log(error);
    }
  };

  //CALL userWalletConnected FUNCTION
  useEffect(() => {
    userWalletConnected();
    checkTransactionExist();
  }, []);

  //PROVIDER VALUES
  const providerValues = {
    connectAccount,
    currentAccount,
    handleChange,
    formData,
    sendTransaction,
    isLoading,
    transactions,
    error,
  };

  return (
    <TransactionsContext.Provider value={providerValues}>
      {children}
    </TransactionsContext.Provider>
  );
};
