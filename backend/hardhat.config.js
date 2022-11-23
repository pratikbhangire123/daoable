/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-web3");

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    lukso14: {
      live: true,
      url: "https://rpc.l14.lukso.network",
      chainId: 22,
    },
    lukso16: {
      live: true,
      url: "https://rpc.l16.lukso.network",
      chainId: 2828,
    },
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  gasReporter: {
    enabled: false,
  },
  etherscan: {
    apiKey: "no-api-key-needed",
    customChains: [
      {
        network: "luksoL14",
        chainId: 22,
        urls: {
          apiURL: "https://blockscout.com/lukso/l14/api",
          browserURL: "https://blockscout.com/lukso/l14",
        },
      },
      {
        network: "luksoL16",
        chainId: 2828,
        urls: {
          apiURL: "https://explorer.execution.l16.lukso.network/api",
          browserURL: "https://explorer.execution.l16.lukso.network/",
        },
      },
    ],
  },
};
