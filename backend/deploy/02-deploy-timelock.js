const { getNamedAccounts, deployments } = require("hardhat");
const {
  MIN_DELAY,
  networkConfig,
  developmentChains,
} = require("../helpers/helper-hardhat-config");

const DeployTimelock = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Timelock...");

  const timelockContract = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  if (!developmentChains.includes(network.name)) {
    await verify(timeLock.address, []);
  }
  log("Timelock deployed at", timelockContract.address);
};

module.exports = DeployTimelock;
// module.exports.tags = ["all", "TimeLock"];
