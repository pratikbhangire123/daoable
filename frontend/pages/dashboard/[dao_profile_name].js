import { useContext } from "react";
import useLoader from "../../utils/useLoader";
import { ProfileContext } from "../../states/profile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [profileConnected] = useContext(ProfileContext);
  const [myLoader] = useLoader();
  const router = useRouter();
  const { dao_profile_name } = router.query;

  return (
    <div className="flex flex-row px-28 items-center">
      <div className="flex flex-col overflow-y-auto w-1/4 h-min p-5 border border-gray-300 rounded-lg">
        <div className="self-center">
          <Image
            className="rounded-full"
            loader={myLoader}
            src={"QmZ3zDELDWSzjyLKxLe5ipM1HKPUvgHVV5c22cnKUc4byk"}
            width={90}
            height={90}
            alt={dao_profile_name}
          />
          <div className="font-bold mt-3">{dao_profile_name}</div>
        </div>
        <div className=" flex flex-col font-medium text-gray-500 leading-10 mt-9">
          <Link href="/dashboard/[dao_profile_name]">
            <a
              className={`hover:text-gray-900 ${
                router.pathname == "/dashboard/[dao_profile_name]"
                  ? "text-gray-900 font-bold"
                  : ""
              } cursor-pointer`}
            >
              Proposals
            </a>
          </Link>
          <Link
            href={{
              pathname: "/dashboard/[dao_profile_name]/new-proposal",
              query: { dao_profile_name },
            }}
          >
            <a
              className={`hover:text-gray-900 ${
                router.pathname == "/dashboard/[dao_profile_name]/new-proposal"
                  ? "text-gray-900 font-bold"
                  : ""
              } cursor-pointer`}
            >
              New Proposal
            </a>
          </Link>
          <Link href="">
            <a
              className={`hover:text-gray-900 ${
                router.pathname == "/" ? "text-gray-900 font-bold" : ""
              } cursor-pointer`}
            >
              Delegate
            </a>
          </Link>
          <Link href="">
            <a
              className={`hover:text-gray-900 ${
                router.pathname == "/" ? "text-gray-900 font-bold" : ""
              } cursor-pointer`}
            >
              Treasury
            </a>
          </Link>
          <Link href="">
            <a
              className={`hover:text-gray-900 ${
                router.pathname == "/" ? "text-gray-900 font-bold" : ""
              } cursor-pointer`}
            >
              About
            </a>
          </Link>
          <Link href="">
            <a
              className={`hover:text-gray-900 ${
                router.pathname == "/" ? "text-gray-900 font-bold" : ""
              } cursor-pointer`}
            >
              Settings
            </a>
          </Link>
        </div>
      </div>
      <div className="font-bold text-2xl w-2/4 self-start ml-10">Proposals</div>
    </div>
  );
}
