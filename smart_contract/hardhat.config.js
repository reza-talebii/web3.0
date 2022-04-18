require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/3Nps1rAGoRlvOWpz_MVy6F8KwOypTUeT",
      accounts: [
        "4785cd0f34d37a2987cb97c5a1987dbdefec317e9b9bfb604897f8441d0bef54",
      ],
    },
  },
};
