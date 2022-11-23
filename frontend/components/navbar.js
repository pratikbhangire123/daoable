import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../states/wallet";
import useGetProviderOrSigner from "../utils/useGetProviderOrSigner";
import Link from "next/link";
import { ProfileDataContext } from "../states/profile-data";
import { ProfileContext } from "../states/profile";
import Menu from "./menu";
import ProfileMenu from "./profile-menu";
import ConnectProfileMenu from "./connect-profile-menu";

export default function Navbar() {
  const [walletConnected, setWalletConnected] = useContext(WalletContext);
  const [getProviderOrSigner] = useGetProviderOrSigner(walletConnected);
  const [account, setAccount] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [showConnectProfileMenu, setShowConnectProfileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileConnected] = useContext(ProfileContext);
  const [profileData] = useContext(ProfileDataContext);
  let menu;
  let connectProfileMenu;
  let profileMenu;

  const getAccountAddress = async () => {
    const signer = await getProviderOrSigner(true);
    const currentAddress = await signer.getAddress();
    setAccount(currentAddress);
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      getAccountAddress();
    } catch (error) {
      console.log(error);
    }
  };

  if (showMenu) {
    menu = <Menu />;
  }

  if (showProfileMenu) {
    profileMenu = <ProfileMenu setShowProfileMenu={setShowProfileMenu} />;
  }

  if (showConnectProfileMenu) {
    connectProfileMenu = profileConnected == false && <ConnectProfileMenu />;
  }

  return (
    <div className="flex flex-row sticky top-0 mb-20 px-14 py-4 items-center justify-between bg-white/95 z-50 border-b border-gray-300">
      <Link href="/">
        <a className="font-bold text-2xl">daoable</a>
      </Link>

      <div className="flex flex-row">
        <div className="mr-3 px-3 py-2 font-bold border border-gray-300 hover:border-gray-600 rounded-full cursor-pointer">
          {profileConnected ? (
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
              }}
            >
              {profileData?.value?.LSP3Profile?.name}
            </button>
          ) : (
            <button
              onClick={() => setShowConnectProfileMenu(!showConnectProfileMenu)}
            >
              <a>Connect Profile</a>
            </button>
          )}
        </div>
        <div className="mr-3 px-3 py-2 font-bold border border-gray-300 hover:border-gray-600 rounded-full cursor-pointer">
          {walletConnected ? (
            <div>
              {account?.slice(0, 6)}...
              {account?.slice(account.length - 4)}
            </div>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
        <div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="px-3 py-2 font-bold border border-gray-300 hover:border-gray-600 rounded-full cursor-pointer"
          >
            <svg
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
              class="text-skin-link"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {connectProfileMenu}
      {profileMenu}
      {menu}
    </div>
  );
}
