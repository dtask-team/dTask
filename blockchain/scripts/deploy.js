// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy Escrow Contract
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy();
  await escrow.deployed();
  console.log("Escrow deployed to:", escrow.address);

  // Deploy ReputationNFT Contract
  const ReputationNFT = await ethers.getContractFactory("ReputationNFT");
  const reputationNFT = await ReputationNFT.deploy();
  await reputationNFT.deployed();
  console.log("ReputationNFT deployed to:", reputationNFT.address);

  // Deploy DisputeDAO Contract
  const DisputeDAO = await ethers.getContractFactory("DisputeDAO");
  const disputeDAO = await DisputeDAO.deploy();
  await disputeDAO.deployed();
  console.log("DisputeDAO deployed to:", disputeDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });