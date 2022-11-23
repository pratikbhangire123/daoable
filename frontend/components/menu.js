import Link from "next/link";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();

  return (
    <div className="flex flex-col absolute bg-white text-lg text-gray-500 font-medium p-5 right-16 top-16 leading-8 border border-gray-300 shadow-lg rounded-lg">
      <Link href="/">
        <a
          className={`hover:text-gray-900 ${
            router.pathname == "/" ? "text-gray-900 font-bold" : ""
          } cursor-pointer`}
        >
          Home
        </a>
      </Link>
      <Link href="/register-dao-up">
        <a
          className={`hover:text-gray-900 ${
            router.pathname == "/register-dao-up"
              ? "text-gray-900 font-bold"
              : ""
          } cursor-pointer`}
        >
          Register DAO Profile
        </a>
      </Link>
      <Link href="/create-dao-up">
        <a
          className={`hover:text-gray-900 ${
            router.pathname == "/create-dao-up" ? "text-gray-900 font-bold" : ""
          } cursor-pointer`}
        >
          Create DAO UP
        </a>
      </Link>
    </div>
  );
}
