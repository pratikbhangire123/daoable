import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import timelock from "../../backend/artifacts/contracts/timelock.sol/TimeLock.json";
import governance from "../../backend/artifacts/contracts/governance.sol/Governance.json";
import { WalletContext } from "../states/wallet";
import useGetProviderOrSigner from "../utils/useGetProviderOrSigner";
import useSetKeyData from "../utils/useSetKeyData";
import useFetchProfileData from "../utils/useFetchProfileData";

export default function SetupDAOProfile(props) {
  const profileAddress = props.profileAddress;
  const [walletConnected] = useContext(WalletContext);
  const [getProviderOrSigner] = useGetProviderOrSigner(walletConnected);
  const [timelockContractAddress, setTimelockContractAddress] = useState("");
  const [governanceContractAddress, setGovernanceContractAddress] =
    useState("");
  const [governanceSettings, setGovernanceSettings] = useState({
    tokenContractAddress: "",
    delay: 0,
    period: 0,
    percentage: 0,
    minDelay: 0,
  });
  const [setKeyData] = useSetKeyData(
    22,
    "0x57caa0c722f803cde2fabb2c2430b0e45144a4e4ebd4c7e006df8477eed2ae68"
  );
  const [fetchProfileData] = useFetchProfileData(22);

  const setGovernanceContracts = async () => {
    try {
      const addresses = {
        keyName: "LSPGovernanceContracts[]",
        timelockAddress: timelockContractAddress,
        governanceAddress: governanceContractAddress,
      };
      await setKeyData(profileAddress, addresses);
    } catch (error) {
      console.error(error);
    }
  };

  const readGovernanceContracts = async () => {
    await fetchProfileData("0x17856F57788155AAe0A475cE6a877B956E671A8e");
  };

  readGovernanceContracts();

  const deployContracts = async () => {
    const signer = await getProviderOrSigner(true);
    const timelockFactory = new ethers.ContractFactory(
      timelock.abi,
      timelock.bytecode,
      signer
    );
    const timelockContract = await timelockFactory.deploy(
      governanceSettings.minDelay,
      [],
      []
    );
    await timelockContract.deployTransaction.wait();
    const address = timelockContract.address;
    setTimelockContractAddress(address);
    await deployGovernance(address);
  };

  const deployGovernance = async (timelockAddress) => {
    const signer = await getProviderOrSigner(true);
    const governanceFactory = new ethers.ContractFactory(
      governance.abi,
      governance.bytecode,
      signer
    );
    const governanceContract = await governanceFactory.deploy(
      governanceSettings.tokenContractAddress,
      timelockAddress,
      "MyDAO",
      governanceSettings.delay,
      governanceSettings.period,
      governanceSettings.percentage
    );
    await governanceContract.deployTransaction.wait();
    const address = governanceContract.address;
    setTimelockContractAddress(address);
    await setGovernanceContracts();
  };

  console.log(timelockContractAddress, governanceContractAddress);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setGovernanceSettings((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // deployContracts();
    setGovernanceContracts();
  };

  return (
    <>
      <div className="text-xl font-bold">Setup DAO Profile</div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="font-semibold mt-5">Token Contract Address</div>
        <input
          className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
          type="text"
          name="tokenContractAddress"
          value={governanceSettings.tokenContractAddress || ""}
          placeholder="0x0000000000000000000000000000000000000000"
          onChange={handleChange}
        />
        <div className="font-semibold mt-5">Voting Delay</div>
        <input
          className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
          type="number"
          name="delay"
          value={governanceSettings.delay || ""}
          placeholder="1"
          onChange={handleChange}
        />
        <div className="font-semibold mt-5">Voting Period</div>
        <input
          className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
          type="number"
          name="period"
          value={governanceSettings.period || ""}
          placeholder="5"
          onChange={handleChange}
        />
        <div className="font-semibold mt-5">Quorum (in %)</div>
        <input
          className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
          type="number"
          name="percentage"
          value={governanceSettings.percentage || ""}
          placeholder="4"
          onChange={handleChange}
        />
        <div className="font-semibold mt-5">Min Delay (before execution)</div>
        <input
          className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
          type="number"
          name="minDelay"
          value={governanceSettings.minDelay || ""}
          placeholder="3600"
          onChange={handleChange}
        />
        <input
          className="w-full font-bold mt-5 p-2 text-white hover:text-black bg-black hover:bg-gray-300 border border-gray-600 rounded-lg cursor-pointer"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
}
