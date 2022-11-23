import { useContext, useState } from "react";
import useGetProviderOrSigner from "../../../utils/useGetProviderOrSigner";
import { WalletContext } from "../../../states/wallet";
import governanceContract from "../../../../backend/artifacts/contracts/governance.sol/Governance.json";
import { Contract } from "ethers";
import { useRouter } from "next/router";

export default function NewProposal() {
  const [walletConnected] = useContext(WalletContext);
  const router = useRouter();
  const [proposal, setProposal] = useState([
    {
      title: "",
      targetAddress: "",
      value: 0,
      targetFunction: "",
      description: "",
      discussion: "",
    },
  ]);
  const [getProviderOrSigner] = useGetProviderOrSigner(walletConnected);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProposal((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createProposal();
  };

  const createProposal = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const daoManagementContract = new Contract(
        "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
        governanceContract.abi,
        signer
      );
      const propose = await daoManagementContract.propose(
        [proposal.targetAddress],
        [proposal.value],
        [proposal.targetFunction],
        proposal.description
      );

      console.log(propose);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col px-16 items-center justify-center">
      <button
        className="font-bold text-lg ml-48 mr-auto border-b-4 border-gray-300 hover:border-gray-700"
        onClick={() => router.back()}
      >
        ← Back
      </button>
      <div className="flex flex-col w-2/3 mt-8 p-5 items-center border border-gray-300 rounded-lg">
        <div className="text-xl font-bold">New Proposal</div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="font-semibold mt-5">Title</div>
          <input
            className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
            type="text"
            name="title"
            value={proposal.title || ""}
            maxLength="100"
            placeholder="MyProposal"
            onChange={handleChange}
          />
          <div className="font-semibold mt-5">Target Contract Address</div>
          <input
            className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
            type="text"
            name="targetAddress"
            value={proposal.targetAddress || ""}
            placeholder="0x0000000000000000000000000000000000000000"
            onChange={handleChange}
          />
          <div className="font-semibold mt-5">Value (in ETH)</div>
          <input
            className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
            type="number"
            name="value"
            value={proposal.value || ""}
            placeholder="0"
            onChange={handleChange}
          />
          <div className="font-semibold mt-5">Target Function</div>
          <input
            className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
            type="text"
            name="targetFunction"
            value={proposal.targetFunction || ""}
            placeholder="Encoded calldata of function name and arguments combined (in bytes)!"
            onChange={handleChange}
          />
          <div className="font-semibold mt-3">Description</div>
          <textarea
            className="w-full h-20 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
            type="text"
            name="description"
            maxLength="500"
            value={proposal.description || ""}
            placeholder="This proposal is to transfer grants to exampleDAO!"
            onChange={handleChange}
          />
          <div className="font-semibold mt-3">Discussion (Optional)</div>
          <input
            className="w-full h-10 px-2 mt-2 border border-gray-300 hover:border-gray-600 rounded-md"
            type="url"
            name="discussion"
            value={proposal.discussion || ""}
            maxLength="300"
            placeholder="https://forum.proposaldiscussion.com/myProposal"
            onChange={handleChange}
          />
          <input
            className="w-full self-center font-bold mt-5 p-2 text-white hover:text-black bg-black hover:bg-gray-300 border border-gray-600 rounded-lg cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}
