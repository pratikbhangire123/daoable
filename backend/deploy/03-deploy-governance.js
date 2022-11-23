const { getNamedAccounts, deployments, web3 } = require("hardhat");
const {
  GOVERNOR_NAME,
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM,
  networkConfig,
  developmentChains,
} = require("../helpers/helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const votingToken = await get("VotingToken");
  const timeLock = await get("TimeLock");

  log("Deploying Governance...");

  const governanceContract = await deploy("Governance", {
    from: deployer,
    args: [
      votingToken.address,
      timeLock.address,
      GOVERNOR_NAME,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM,
    ],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  log("Governance deployed at:", governanceContract.address);

  if (!developmentChains.includes(network.name)) {
    await verify(governanceContract.address, []);
  }
};

module.exports.tags = ["all", "Governance"];
