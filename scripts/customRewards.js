const TokenStaking = artifacts.require('TokenStaking');

module.exports = async function(callback) {
  let tokenStaking = await TokenStaking.deployed();
  await tokenStaking.customRewards();
  console.log('--- Daily [Custom] rewards have been redistributed ---');
  callback();
};

//to run script  -  truffle exec scripts/customRewards.js