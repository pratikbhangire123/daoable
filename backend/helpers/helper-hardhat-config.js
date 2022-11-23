const TOKEN_NAME = "MyToken";
const TOKEN_SYMBOL = "MTK";
const MIN_DELAY = 3600;
const GOVERNOR_NAME = "MyDAO";
const VOTING_DELAY = 1;
const VOTING_PERIOD = 5;
const QUORUM = 4;
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const developmentChains = ["hardhat", "localhost"];
const networkConfig = {
  localhost: {},
  hardhat: {},
  kovan: {
    blockConfirmations: 6,
  },
  lukso14: {
    blockConfirmations: 6,
  },
  lukso16: {
    blockConfirmations: 6,
  },
};

module.exports = {
  TOKEN_NAME,
  TOKEN_SYMBOL,
  MIN_DELAY,
  GOVERNOR_NAME,
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM,
  ADDRESS_ZERO,
  developmentChains,
  networkConfig,
};
