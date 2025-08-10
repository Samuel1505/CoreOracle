import { ethers } from "hardhat";
import { PrizePoolPrediction } from "../typechain-types";

const CONTRACT_ADDRESS = "0x9b39Fb4c93d80dF3E91a0369c5B6599Cf80873A4";

async function main() {
  console.log("🧪 Testing deployed PrizePoolPrediction contract...");
  console.log(`📍 Contract Address: ${CONTRACT_ADDRESS}`);
  
  // Get the contract instance
  const PrizePoolPredictionFactory = await ethers.getContractFactory("PrizePoolPrediction");
  const contract = PrizePoolPredictionFactory.attach(CONTRACT_ADDRESS) as PrizePoolPrediction;
  
  const [deployer] = await ethers.getSigners();
  console.log(`👤 Testing with account: ${deployer.address}`);
  
  try {
    // Test 1: Get contract owner
    console.log("\n📋 Test 1: Getting contract owner...");
    const owner = await contract.owner();
    console.log(`✅ Owner: ${owner}`);
    
    // Test 2: Get platform fee
    console.log("\n📋 Test 2: Getting platform fee...");
    const platformFee = await contract.platformFee();
    console.log(`✅ Platform Fee: ${platformFee} basis points (${Number(platformFee) / 100}%)`);
    
    // Test 3: Get streak saver price
    console.log("\n📋 Test 3: Getting streak saver price...");
    const streakSaverPrice = await contract.streakSaverPrice();
    console.log(`✅ Streak Saver Price: ${ethers.formatEther(streakSaverPrice)} ETH`);
    
    // Test 4: Get prediction counter
    console.log("\n📋 Test 4: Getting prediction counter...");
    const predictionCounter = await contract.predictionCounter();
    console.log(`✅ Prediction Counter: ${predictionCounter}`);
    
    // Test 5: Create a test prediction
    console.log("\n📋 Test 5: Creating a test prediction...");
    const question = "Will the price of ETH be above $2000 by end of month?";
    const options = ["YES", "NO"];
    const entryFee = ethers.parseEther("0.001");
    const endTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const resolutionTime = endTime + 7200; // 2 hours after end time
    
    console.log(`📝 Question: ${question}`);
    console.log(`🔘 Options: ${options.join(", ")}`);
    console.log(`💰 Entry Fee: ${ethers.formatEther(entryFee)} ETH`);
    console.log(`⏰ End Time: ${new Date(endTime * 1000).toLocaleString()}`);
    
    const tx = await contract.createPrediction(
      question,
      options,
      entryFee,
      endTime,
      resolutionTime,
      { value: ethers.parseEther("0.01") } // Initial prize pool
    );
    
    console.log("⏳ Waiting for transaction confirmation...");
    const receipt = await tx.wait();
    console.log(`✅ Prediction created! Transaction: ${receipt?.hash}`);
    
    // Test 6: Get the created prediction
    console.log("\n📋 Test 6: Getting created prediction details...");
    const predictionId = await contract.predictionCounter();
    const prediction = await contract.getPrediction(predictionId);
    
    console.log(`📊 Prediction ID: ${prediction.id}`);
    console.log(`❓ Question: ${prediction.question}`);
    console.log(`🔘 Options: ${prediction.options.join(", ")}`);
    console.log(`💰 Entry Fee: ${ethers.formatEther(prediction.entryFee)} ETH`);
    console.log(`🏆 Prize Pool: ${ethers.formatEther(prediction.prizePool)} ETH`);
    console.log(`⏰ End Time: ${new Date(Number(prediction.endTime) * 1000).toLocaleString()}`);
    console.log(`📅 Resolution Time: ${new Date(Number(prediction.resolutionTime) * 1000).toLocaleString()}`);
    console.log(`✅ Active: ${prediction.active}`);
    console.log(`👥 Total Participants: ${prediction.totalParticipants}`);
    
    console.log("\n🎉 All tests completed successfully!");
    console.log("💡 Your contract is working correctly on Core Testnet!");
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
}); 