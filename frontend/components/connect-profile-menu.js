import Link from "next/link";
import useUniversalProfile from "../utils/useUniversalProfile";

export default function ConnectProfileMenu() {
  const [connectProfile] = useUniversalProfile();

  const connectUP = async () => {
    try {
      await connectProfile();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col absolute bg-white text-normal text-gray-600 font-semibold px-4 py-2 right-72 top-16 leading-7 items-start border border-gray-300 shadow-lg rounded-lg">
      <button className="hover:text-gray-900" onClick={connectUP}>
        Connect with Extension (L16 Only)
      </button>
      <Link href="/manage-up">
        <a className="hover:text-gray-900">Connect Manually</a>
      </Link>
    </div>
  );
}
