const TokenStaking = artifacts.require('TokenStaking');

module.exports = async function(callback) {


  let tokenStaking = await TokenStaking.deployed();
  await tokenStaking.redistributeRewards();


  //code goes here
  console.log('--- Rewards Have been redistributed ---');

  callback();
};

//to run script  -  truffle exec scripts/redistribute.js
