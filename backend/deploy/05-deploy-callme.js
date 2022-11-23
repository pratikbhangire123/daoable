const { getNamedAccounts, deployments, ethers } = require("hardhat");
const { networkConfig } = require("../helpers/helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying CallMe...");

  const CallMe = await deploy("CallMe", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  log("CallMe deployed at:", CallMe.address);
  await getEncodedCalldata(CallMe.address);
};

const getEncodedCalldata = async (CallMeContractAddress) => {
  const CallMeContractInstance = await ethers.getContractAt(
    "CallMe",
    CallMeContractAddress
  );
  const functionCalldata = await CallMeContractInstance.getData();
//   await functionCalldata.wait(1);

  console.log("Function Calldata:", functionCalldata);
};

module.exports.tags = ["all", "CallMe"];
