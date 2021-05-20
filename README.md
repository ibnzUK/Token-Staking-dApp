
# Token Staking dApp <h1>

###### Blockchain Token Staking dApp built with React, Solidity, on ethereum Ganache testnet <h6>




## Changes
* Added ERC20 TestToken 
* Added Token Staking basic contract
* Started testing 
-
* Updated Token Staking contract
* Added ability to stake, unstake, redistribute
* Implemented testing 


## Running instructions

* copy project to your directory ( git clone https://github.com/ibnzUK/Token-Staking-dApp )
* install project packages (npm install)
* start project (npm run start)


## For Testing
* To run tests from /test/TokenStaking (truffle test)

testing output
 ``` Contract: TokenStaking
    TestToken deployment
      ✓ token deployed and has a name (143ms)
    TokenStaking deployment
      ✓ staking contract deployed and has a name (85ms)
      ✓ staking contract has 500k TestTokens tokens inside (143ms)
    TokenStaking stakeTokens function
      ✓ investors able to deposit (141ms)
      ✓ aproving tokens, staking tokens, checking balance (1069ms)
      ✓ checking contract balance after staking (141ms)
      ✓ checking user balance inside contract (119ms)
      ✓ testing if user is staking at the moment (88ms)
      ✓ testing if user has staked (141ms)
    TokenStaking redistributeRewards function
      ✓ checking who can do redistribution (646ms)
      ✓ checking TokenStaking balance (190ms)
      ✓ checking user balance (110ms)
    TokenStaking unstakeTokens function
      ✓ checking users balance (445ms)
      ✓ should do something```


for private ethereum test network make sure Ganache is running on HTTP://127.0.0.1:7545


