import { providers } from "ethers";
import { useEffect, useRef } from "react";
import Web3Modal from "web3modal";

export default function useGetProviderOrSigner(walletConnected) {
  const web3ModalRef = useRef();

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "localhost",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [walletConnected]);

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef?.current?.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    console.log(chainId)

    if (chainId !== 22 && chainId !== 2828 && chainId !== 31337) {
      window.alert(`You are on chainId: ${chainId}, please change to appropriate network!`);
      throw new Error("Change to appropriate network!");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }

    return web3Provider;
  };
  // console.log("Get Provider:", getProvider);
  return [getProviderOrSigner];
}
