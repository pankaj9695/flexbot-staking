import { useEffect, useState } from "react";
import Web3 from "web3";
import { notifyError, notifyInfo } from "../utils/toast";

export default function ConnectButton({ ownerAddress, setOwnerAddress }) {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await window.ethereum.enable();
        setOwnerAddress(accounts[0]);
        // notifyInfo("Wallet connected successfully");
      } catch (error) {
        notifyError("Wallet connection failed");
      }
    } else {
      notifyError("MetaMask is not installed");
    }
  };
  useEffect(() => {
    if (web3) {
      connectWallet();
    }
  }, [web3]);

  return (
    <>
      <button
        className="text-neutral-900 block text-base  font-medium leading-5 tracking-normal justify-center items-stretch shadow-sm bg-white self-center  max-w-full px-3 py-2.5 rounded-[30px]"
        onClick={connectWallet}
      >
        {ownerAddress ? "wallet connected 👍" : "connect wallet"}
      </button>
    </>
  );
}
