import Link from "next/link";
import { useContext } from "react";
import { ProfileContext } from "../states/profile";
import { ProfileDataContext } from "../states/profile-data";

export default function ProfileMenu(props) {
  const [profileData, setProfileData] = useContext(ProfileDataContext);
  const [profileConnected, setProfileConnected] = useContext(ProfileContext);
  const setShowProfileMenu = props.setShowProfileMenu;

  const disconnectUP = () => {
    setProfileData(null);
    setProfileConnected(false);
    setShowProfileMenu(false);
    window.localStorage.setItem("profileConnected", JSON.stringify(false));
    window.localStorage.setItem("profileData", JSON.stringify(null));
  };

  return (
    <div className="flex flex-col absolute bg-white text-normal text-gray-600 font-semibold px-4 py-2 right-72 top-16 leading-7 items-start border border-gray-300 shadow-lg rounded-lg">
      <Link
        href={{
          pathname: "/view-profile/[profile_name]",
          query: {
            profile_name: profileData?.value?.LSP3Profile?.name,
          },
        }}
      >
        <a className="hover:text-gray-900">View Profile</a>
      </Link>
      <button className="hover:text-gray-900" onClick={disconnectUP}>
        Disconnect
      </button>
    </div>
  );
}
