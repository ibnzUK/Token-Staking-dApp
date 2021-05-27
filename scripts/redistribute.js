const TokenStaking = artifacts.require('TokenStaking');

module.exports = async function(callback) {
  let tokenStaking = await TokenStaking.deployed();
  await tokenStaking.redistributeRewards();
  console.log('--- Daily rewards have been redistributed ---');
  callback();
};

//to run script  -  truffle exec scripts/redistribute.js
