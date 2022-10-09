// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
var address = ""
async function main() {
    // const Greeter = await hre.ethers.getContractFactory("Greeter")
    // const greeter  = await Greeter.deploy("Hello World")
    
    // const Token = await hre.ethers.getContractFactory("Token")
    // const token = await Token.deploy()

    // const NDToken = await hre.ethers.getContractFactory("NDToken")
    // const ndtoken = await NDToken.deploy("Naber Dabit Token","NDT")

    // await greeter.deployed()
    // await token.deployed()
    // await ndtoken.deployed()
    // console.log(`Greeter contract deployed to ${greeter.address}`)
    // console.log(`Token contract deployed to ${token.address}`)
    // console.log(`NDToken contract has been successfully deployed at ${ndtoken.address}`)
    const MyNFT = await hre.ethers.getContractFactory("MyNFT")

    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy()

    await myNFT.deployed()
    address = myNFT.address
    console.log("Contract deployed to address:", myNFT.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
module.exports = {address}