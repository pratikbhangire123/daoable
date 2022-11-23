import Image from "next/image";
import Link from "next/link";

export default function ProfileConnected(props) {
  const profileData = props.profileData;
  const disconnectUP = props.disconnectUP;

  const handleDisconnect = () => {
    disconnectUP();
  };

  return (
    <div className="flex flex-col w-1/2 p-5 items-center border border-gray-300 rounded-lg">
      <div className="flex flex-row text-lg">
        You're now connected,
        <div className="font-bold">
          &nbsp;{profileData?.value?.LSP3Profile?.name}
        </div>
        !
      </div>

      <Link href="/">
        <a className="font-bold mt-8 p-2 text-white hover:text-black bg-black hover:bg-gray-300 border border-gray-600 rounded-lg cursor-pointer">
          Go to Home
        </a>
      </Link>
      <button
        className="font-bold mt-3 p-2 border border-gray-300 hover:border-gray-600 rounded-lg cursor-pointer"
        onClick={handleDisconnect}
      >
        Disconnect
      </button>
    </div>
  );
}
