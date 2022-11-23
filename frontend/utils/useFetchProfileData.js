import { ERC725 } from "@erc725/erc725.js";
import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import { useContext } from "react";
import Web3 from "web3";
import { DAOProfileDataContext } from "../states/dao-profile-data";
import { ProfileContext } from "../states/profile";
import { ProfileDataContext } from "../states/profile-data";
import LSPGovernanceSchema from "../LSPGovernanceSchema.json";

export default function useFetchProfileData(chainId) {
  const [daoProfileData, setDAOProfileData] = useContext(DAOProfileDataContext);
  const [profileConnected, setProfileConnected] = useContext(ProfileContext);
  const [profileData, setProfileData] = useContext(ProfileDataContext);
  let tmpProfileArray = [];
  const RPC_ENDPOINT_L14 = "https://rpc.l14.lukso.network";
  const RPC_ENDPOINT_L16 = "https://rpc.l16.lukso.network";
  const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";

  const provider = new Web3.providers.HttpProvider(
    chainId === 2828 ? RPC_ENDPOINT_L16 : RPC_ENDPOINT_L14
  );
  const config = { ipfsGateway: IPFS_GATEWAY };

  const fetchProfileData = async (address, isDAOProfile) => {
    try {
      const erc725 = new ERC725(
        erc725schema.concat(LSPGovernanceSchema),
        address,
        provider,
        config
      );
      const profile = await erc725.fetchData();
      console.log(profile);

      if (isDAOProfile == true) {
        tmpProfileArray.push(profile[1]);
        setDAOProfileData(tmpProfileArray);
      } else if (isDAOProfile == false) {
        setProfileConnected(true);
        setProfileData(profile[1]);
      }
    } catch (error) {
      return console.error(error);
    }
  };

  return [fetchProfileData];
}
