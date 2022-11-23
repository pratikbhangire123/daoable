const { getNamedAccounts, deployments, ethers } = require("hardhat");
const { ADDRESS_ZERO } = require("../helpers/helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const timeLock = await ethers.getContract("TimeLock", deployer);
  const governance = await ethers.getContract("Governance", deployer);

  log("Setting up contracts for roles...");

  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

  const proposerTx = await timeLock.grantRole(proposerRole, governance.address);
  await proposerTx.wait(1);

  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
  await executorTx.wait(1);

  const revokeTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeTx.wait(1);

  log("Proposer Role:", proposerRole);
  log("Executor Role:", executorRole);
  log("Admin Role:", adminRole);
};

module.exports.tags = ["all", "setup"];
