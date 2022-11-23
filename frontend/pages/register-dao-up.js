import { useState } from "react";
import Link from "next/link";
import SetupDAOProfile from "../components/setup-dao-profile";

export default function RegisterDAOUp() {
  const [daoAddresses, setDAOAddresses] = useState([{ address: "" }]);
  const [registered, setRegistered] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDAOAddresses((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(daoAddresses);
    const endpoint = "/api/dao-addresses";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(`Is this your address: ${result.data}`);
    setRegistered(true);
  };

  return (
    <div className="flex flex-col px-28 items-center justify-center">
      <div className="flex flex-col w-1/2 p-10 items-center border border-gray-300 rounded-lg">
        {registered ? (
          <SetupDAOProfile profileAddress={daoAddresses.address} />
        ) : (
          <>
            <div className="text-xl font-bold">Register DAO Profile</div>
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                className="w-full h-10 px-2 mt-5 border border-gray-300 hover:border-gray-600 rounded-md"
                type="text"
                name="address"
                value={daoAddresses.address || ""}
                placeholder="Paste your address..."
                onChange={handleChange}
              />
              <input
                className="w-full font-bold mt-5 p-2 text-white hover:text-black bg-black hover:bg-gray-300 border border-gray-600 rounded-lg cursor-pointer"
                type="submit"
                value="Register"
              />
            </form>
            <Link href="/create-dao-up">
              <a className="w-full font-bold text-center mt-3 p-2 border border-gray-300 hover:border-gray-600 rounded-lg cursor-pointer">
                Don't have? Create One!
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
