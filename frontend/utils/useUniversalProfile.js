import { useState } from "react";
import Web3 from "web3";
import useFetchProfileData from "./useFetchProfileData";

export default function useUniversalProfile() {
  const [chainId, setChainId] = useState(2828);
  const [fetchProfileData] = useFetchProfileData(chainId);

  const connectProfile = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await web3.eth.requestAccounts();
      const account = await web3.eth.getAccounts();
      const Id = await web3.eth.getChainId();
      setChainId(Id);
      const address = account.toString();
      await fetchProfileData(address, false);
    } catch (error) {
      console.error(error);
    }
  };

  return [connectProfile];
}
