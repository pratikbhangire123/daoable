import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import useFetchProfileData from "../utils/useFetchProfileData";
import { DAOProfileDataContext } from "../states/dao-profile-data";
import useLoader from "../utils/useLoader";
import Loader from "./loader";

export default function Intro() {
  const [totalDAOAddresses, setTotalDAOAddresses] = useState([{}]);
  const [daoProfileData] = useContext(DAOProfileDataContext);
  const [daoProfilesArray, setDAOProfilesArray] = useState([{}]);
  const [fetchProfileData] = useFetchProfileData();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [myLoader] = useLoader();

  useEffect(() => {
    getDAOAddresses();
  }, []);

  useEffect(() => {
    if (totalDAOAddresses.length > 1) {
      getDAOProfiles();
    }
  }, [totalDAOAddresses.length, isLoading]);

  const getDAOAddresses = async () => {
    setIsLoading(true);
    try {
      const endpoint = "/api/dao-addresses";
      const response = await fetch(endpoint);
      const result = await response.json();
      setTotalDAOAddresses(result.data);
    } catch (error) {
      setIsError(error);
      console.error(error);
    }
  };

  const getDAOProfiles = async () => {
    try {
      for (let i = 0; i < totalDAOAddresses.length; i++) {
        const address = totalDAOAddresses[i].toString();
        await fetchProfileData(address, true);
      }
      setDAOProfiles();
    } catch (error) {
      setIsError(error);
      console.error(error);
    }
  };

  const setDAOProfiles = () => {
    try {
      let tmpDAOProfileArray = [];
      for (let i = 0; i < daoProfileData.length; i++) {
        tmpDAOProfileArray.push(daoProfileData);
      }
      setDAOProfilesArray(tmpDAOProfileArray[0]);
      setIsLoading(false);
    } catch (error) {
      setIsError(error);
      console.error(error);
    }
  };

  const chooseRender = () => {
    if (isLoading) {
      return <Loader />;
    } else if (isError) {
      return <div>Fail to load...</div>;
    } else {
      return (
        <div className="grid gap-4 grid-cols-3 mt-10 items-center">
          {daoProfilesArray?.map((item, index) => (
            <Link
              href={{
                pathname: "/dashboard/[dao_profile_name]",
                query: { dao_profile_name: item?.value?.LSP3Profile?.name },
              }}
              key={index}
            >
              <div className="flex flex-col p-5 items-center border border-gray-300 hover:border-gray-600 rounded-lg cursor-pointer">
                <Image
                  className="rounded-full"
                  loader={myLoader}
                  src={"QmZ3zDELDWSzjyLKxLe5ipM1HKPUvgHVV5c22cnKUc4byk"}
                  width={80}
                  height={80}
                  alt={item?.value?.LSP3Profile?.name}
                />
                <div className="font-semibold text-lg mt-3">
                  {item?.value?.LSP3Profile?.name}
                </div>
                <div className="mt-3 font-light text-center text-base text-gray-500">
                  {item?.value?.LSP3Profile?.description}
                </div>
                <button className="font-bold mt-3 py-2 px-3 min-w-min border border-gray-300 hover:border-gray-600 rounded-full cursor-pointer">
                  Join
                </button>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-xl">DAO Profiles</div>
      {chooseRender()}
    </div>
  );
}
