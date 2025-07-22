require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    blockdag: {
      url: "https://testnet.blockdag.network", // Replace with real RPC
      accounts: [process.env.PRIVATE_KEY] // Add .env with PRIVATE_KEY=0xabc...
    }
  }
};
