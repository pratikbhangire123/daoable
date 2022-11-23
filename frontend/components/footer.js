import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col h-28 w-1/1 mt-20 p-16 items-center justify-center border-t border-gray-300">
      <div className="font-semibold text-xl">
        Want to register your DAO Profile?
      </div>
      <Link href="/register-dao-up">
        <button className="font-bold mt-5 p-2 bg-black hover:bg-gray-300 text-white hover:text-black border border-gray-600 rounded-lg cursor-pointer">
          Register Now!
        </button>
      </Link>
    </div>
  );
}
