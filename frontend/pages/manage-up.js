import { useContext, useEffect, useState } from "react";
import ProfileConnected from "../components/profile-connect-success";
import useFetchProfileData from "../utils/useFetchProfileData";
import { ProfileContext } from "../states/profile";
import { ProfileDataContext } from "../states/profile-data";

export default function ManageUP() {
  const [selectedChain, setSelectedChain] = useState("");
  const [profileAddress, setProfileAddress] = useState("");
  const [profileConnected, setProfileConnected] = useContext(ProfileContext);
  const [profileData, setProfileData] = useContext(ProfileDataContext);
  const [fetchProfileData] = useFetchProfileData(
    selectedChain === "L16" ? 2828 : 22
  );

  useEffect(() => {
    console.log("DAO UP Address:", profileAddress);
    console.log("DAO UP:", profileData);
    console.log("Profile Connected: ", profileConnected);
  }, [profileConnected]);

  const connectUP = async (e) => {
    e.preventDefault();
    await fetchProfileData(profileAddress, false);
  };

  const disconnectUP = () => {
    setProfileAddress("");
    setProfileData(null);
    setProfileConnected(false);
    window.localStorage.setItem("profileConnected", JSON.stringify(false));
    window.localStorage.setItem("profileData", JSON.stringify(null));
  };

  return (
    <div className="flex flex-col px-28 py-28 items-center justify-center">
      {profileConnected == false && (
        <div className="flex flex-col w-1/2 p-10 items-center border border-gray-300 rounded-lg">
          <div className="text-xl font-bold">Connect Profile</div>

          <div className="flex flex-row mt-5 items-center justify-center">
            <div className="text-sm">Choose Network:</div>
            <button
              className={`ml-3 px-2 py-1 border border-gray-300 hover:border-gray-600 ${
                selectedChain === "L14" ? "bg-gray-300" : ""
              } rounded-lg`}
              onClick={() => setSelectedChain("L14")}
            >
              L14
            </button>
            <button
              className={`ml-3 px-2 py-1 border border-gray-300 hover:border-gray-600 ${
                selectedChain === "L16" ? "bg-gray-300" : ""
              } rounded-lg`}
              onClick={() => setSelectedChain("L16")}
            >
              L16
            </button>
          </div>

          <form className="w-full" onSubmit={connectUP}>
            <input
              className="w-full h-10 px-2 mt-5 border border-gray-300 hover:border-gray-600 rounded-md"
              type="text"
              value={profileAddress}
              placeholder="Paste your address..."
              onChange={(e) => setProfileAddress(e.target.value)}
            />
            <input
              className="w-full font-bold mt-5 p-2 text-white hover:text-black bg-black hover:bg-gray-300 border border-gray-600 rounded-lg cursor-pointer"
              type="submit"
              value="Connect"
            />
          </form>
        </div>
      )}
      {profileConnected && (
        <ProfileConnected
          profileData={profileData}
          disconnectUP={disconnectUP}
        />
      )}
    </div>
  );
}

//0x17856F57788155AAe0A475cE6a877B956E671A8e
