import { useContext } from "react";
import { ProfileDataContext } from "../../states/profile-data";
import Image from "next/image";
import useLoader from "../../hooks/useLoader";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ViewProfile() {
  const [profileData, setProfileData] = useContext(ProfileDataContext);
  const [myLoader] = useLoader();
  const router = useRouter();

  return (
    <div className="flex flex-col p-12 items-center justify-center">
      <div className="flex flex-row space-x-96">
        <button
          className="font-bold text-lg mr-48 border-b-4 border-gray-300 hover:border-gray-700"
          onClick={() => router.back()}
        >
          ← Back
        </button>
        <Link href="/">
          <a className="font-bold text-lg ml-48 border-b-4 border-gray-300 hover:border-gray-700">
            Home
          </a>
        </Link>
      </div>

      <div className="mt-10 font-semibold text-xl">Your Profile</div>
      <div className="flex flex-col mt-5 pb-5 items-center justify-center border border-gray-300 rounded-lg">
        <div className="-mb-12 rounded-t-lg">
          <Image
            className="rounded-t-lg"
            loader={myLoader}
            src={"QmVREMJYKdfvrjLeqFf4zRWJLBgChPMomMwFXnuLasY7Ly"}
            width={700}
            height={200}
          />
        </div>

        <Image
          className="rounded-full"
          loader={myLoader}
          src={"QmZ3zDELDWSzjyLKxLe5ipM1HKPUvgHVV5c22cnKUc4byk"}
          width={100}
          height={100}
          alt={profileData?.value?.LSP3Profile?.name}
        />

        <div className="font-bold text-lg mt-3">
          {profileData?.value?.LSP3Profile?.name}
        </div>

        <div className="mt-3">
          {profileData?.value?.LSP3Profile?.description}
        </div>

        <div className="mt-3">{profileData?.value?.LSP3Profile?.tags}</div>

        <div className="flex flex-row items-center justify-between mt-5 px-3 py-2 text-xs bg-gray-100 border border-gray-300 hover:border-gray-600 rounded-full cursor-pointer">
          {profileData?.value?.LSP3Profile?.links.map((item, index) => (
            <Link href={item.url} key={index}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
