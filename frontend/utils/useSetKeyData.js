import { LSPFactory } from "@lukso/lsp-factory.js";
import { ERC725 } from "@erc725/erc725.js";
import Web3 from "web3";
import UniversalProfile from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import KeyManager from "@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json";
import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import LSPGovernanceSchema from "../LSPGovernanceSchema.json";

export default function useSetKeyData(chainId, PRIVATE_KEY) {
  const RPC_ENDPOINT_L14 = "https://rpc.l14.lukso.network";
  const RPC_ENDPOINT_L16 = "https://rpc.l16.lukso.network";
  const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";
  const provider = new Web3.providers.HttpProvider(
    chainId === 2828 ? RPC_ENDPOINT_L16 : RPC_ENDPOINT_L14
  );
  const web3 = new Web3(provider);
  const config = { ipfsGateway: IPFS_GATEWAY };
  const lspFactory = new LSPFactory(RPC_ENDPOINT_L14, {
    deployKey: PRIVATE_KEY,
    chainId: chainId,
  });

  const setKeyData = async (address, data) => {
    const profile = new ERC725(
      erc725schema.concat(LSPGovernanceSchema),
      address,
      web3.currentProvider,
      config
    );

    const universalProfileContract = new web3.eth.Contract(
      UniversalProfile.abi,
      address,
      {
        gas: 5_00_000,
        gasPrice: "1000000000",
      }
    );

    const encodedData = profile.encodeData({
      keyName: "LSPGovernanceContracts[]",
      value: [data.timelockAddress, data.governanceAddress],
    });

    const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

    const keyManagerAddress = await universalProfileContract.methods
      .owner()
      .call();

    const keyManagerContract = new web3.eth.Contract(
      KeyManager.abi,
      keyManagerAddress
    );

    const abiPayload = await universalProfileContract.methods[
      "setData(bytes32[],bytes[])"
    ](encodedData.keys, encodedData.values).encodeABI();

    await keyManagerContract.methods
      .execute(abiPayload)
      .send({ from: myEOA.address, gasLimit: 300_000 });

    console.log("Successfully Set!");
  };

  return [setKeyData];
}
