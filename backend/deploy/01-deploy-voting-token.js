const { getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  TOKEN_NAME,
  TOKEN_SYMBOL,
  developmentChains,
  networkConfig,
} = require("../helpers/helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying VotingToken...");

  const votingTokenContract = await deploy("VotingToken", {
    from: deployer,
    args: [TOKEN_NAME, TOKEN_SYMBOL],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });

  log("VotingToken Deployed at:", votingTokenContract.address);
  if (!developmentChains.includes(network.name)) {
    await verify(votingTokenContract.address, []);
  }
  log(`Delegating to ${deployer}`);
  await delegate(votingTokenContract.address, deployer);
  log("Delegated!");
};

const delegate = async (votingTokenAddress, delegatedAccount) => {
  const votingTokenContractInstance = await ethers.getContractAt(
    "VotingToken",
    votingTokenAddress
  );
  const transactionResponse = await votingTokenContractInstance.delegate(
    delegatedAccount
  );
  await transactionResponse.wait(1);

  console.log(
    "Checkpoints:",
    await votingTokenContractInstance.numCheckpoints(delegatedAccount)
  );
};

module.exports.tags = ["all", "VotingToken"];
