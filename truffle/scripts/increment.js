/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const Complaints = artifacts.require("Complaints");

module.exports = async function (callback) {
  const deployed = await Complaints.deployed();

  const currentValue = (await deployed.reader()).toNumber();
  console.log(`Current Complaints value: ${currentValue}`);

  const { tx } = await deployed.writer(currentValue + 1);
  console.log(`Confirmed transaction ${tx}`);

  const updatedValue = (await deployed.reader()).toNumber();
  console.log(`Updated SimpleStorage value: ${updatedValue}`);

  callback();
};
