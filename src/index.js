require("dotenv").config();
const { ethers, BigNumber } = require("ethers");
const abi = require("../abi/CryptoPunksMarket.json");
const address = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";
async function main() {
  const provider = new ethers.providers.WebSocketProvider(
    process.env.MAINNET_URL
  );
  const contract = new ethers.Contract(address, abi, provider);
  let lastBlockNumber = -1;
  let count = BigNumber.from(0);

  contract.on("Transfer", (from, to, amount, event) => {
    console.log(
      `blockNumber: ${
        event.blockNumber
      } ${from} sent ${ethers.utils.formatEther(amount)} to ${to}`
    );
    if (lastBlockNumber !== event.blockNumber) {
      if (lastBlockNumber !== -1) {
        console.log(`blockNumber: ${lastBlockNumber} count: ${count}`);
        count = BigNumber.from(0);
      }
      lastBlockNumber = event.blockNumber;
    } else {
      count = count.add(amount);
    }
  });
}

main();
