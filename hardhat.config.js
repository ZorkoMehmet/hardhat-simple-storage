require("dotenv").config()
require("@nomicfoundation/hardhat-verify")
// require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox")
require("./tasks/block-number")

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: hardhat already placing them. Thanks hardo ;)
            chainId: 31337
        }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY,
    },
    solidity: "0.8.19",
}
// 0x0836221Ab77392f1ba3Ce2F2712Ecdd69cb97F75
