
# Token Staking dApp <h1>



###### Blockchain Token Staking dApp built with React, Solidity, on ethereum Ganache testnet <h6>


![Preview](src/assets/screenshot.png)
- 
![Preview](src/assets/screenshot2.png)

## Changes
- [x] Added ERC20 TestToken 
- [x] Added Token Staking basic contract
- [x] Started testing 
* 
- [x] Updated Token Staking contract
- [x] Added ability to stake, unstake, redistribute
- [x] Implemented testing 
- [x] Added redistribution script
* 
- [x] Injected web3 and metamask
- [x] Ability to detect if metamask installed, logged, locked
- [x] Added skeletons for totalStaked, myStake, 
- [x] Added skeletons for Tester to Redistribute rewards and claim test tokens
* 
- [x] Added ability to load contracts
- [x] Fetching data from TokenStaking contract
- [x] Fetching balances
- [x] Stake, Unstake is now working
- [x] Redistribute rewards for (Admin only) is now working
* 
- [x] Implemented totalstaked
- [x] Implemented ability to claim test token(Tst) (FOR TESTIN PURPOSE ONLY)
- [x] Added amount type validity check
- [x] Add ability for user to stake max 
* 
- [x] Added ability to listen to triggers .on transactionHash
- [x] Data automatically fetched after confirmation received
- [x] Added HDWallet provider and Infura setup
- [x] Deployed on ropsten and rinkeby
* 
- [x] Different staking pool implemented customStake/customUnstake
- [x] Implemented ability for admin to change custom pool APY value
* 
- [x] Implemented custom reward Pool redistribution
- [x] Contract Source Code Verified (Exact Match)
* 
- [ ] Add frontend for custom pool
- [ ] Add loader, indicator
- [ ] Split components in to smaller
- [ ] Add clear running description








## Running instructions

* Copy project to your directory ( git clone https://github.com/ibnzUK/Token-Staking-dApp )
* Install project packages (npm install)
* Start project (npm run start)


## For Testing
* To run tests from /test/TokenStaking (truffle test)

mocha testing output
 ``` Contract: TokenStaking
    TestToken deployment
      ✓ token deployed and has a name (246ms)
    TokenStaking deployment
      ✓ staking contract deployed and has a name (160ms)
      ✓ checking default APY value (179ms)
      ✓ checking custom APY value (128ms)
      ✓ staking contract has 500k TestTokens tokens inside (176ms)
    TokenStaking stakeTokens function
      ✓ users balance is correct before staking (126ms)
      ✓ checking total staked before any stakes (126ms)
      ✓ aproving tokens, staking tokens, checking balance (1259ms)
      ✓ checking contract balance after staking (156ms)
      ✓ checking user balance inside contract (131ms)
      ✓ checking total staked (136ms)
      ✓ testing if user is staking at the moment (148ms)
      ✓ testing if user has staked (145ms)
    TokenStaking redistributeRewards function
      ✓ checking who can do redistribution (1059ms)
      ✓ checking TokenStaking balance (105ms)
      ✓ checking user balance (130ms)
    TokenStaking unstakeTokens function
      ✓ unstaking and checking users balance after unstake (468ms)
      ✓ checking total staked (132ms)
    TokenStaking [custom] staking/unstaking functions
      ✓ checking total custom staked before any stakes (132ms)
      ✓ checking usrs balance before staking (165ms)
      ✓ aproving tokens, staking tokens, checking balance (1131ms)
      ✓ checking custom total staked (125ms)
      ✓ testing if user is staking at custom staking at the moment (147ms)
      ✓ testing if user has staked at custom staking (107ms)
      ✓ unstaking from custom staking and checking users balance  (535ms)
    Claim Tst
      ✓ trying to obtain 1000 test token (395ms)
    Change custom APY value
      ✓ checking who can change APY (1115ms)
      ✓ checking new custom APY value (146ms)
    Testing custom APY reward redistribution
      ✓ staking at customStaking (1299ms)
      ✓ redistributing rewards, checking who can redistribute (733ms)
      ✓ checking user balance after custom APY rewards  (111ms)
```      


For private ethereum test network make sure Ganache is running on HTTP://127.0.0.1:7545


TokenStaking Smart Contract Address on Test Net
* Ropsten: Verified: https://ropsten.etherscan.io/address/0x0Fab2A018bB44DD2a6Ef7C55F057Dd9d9eC1B19F#contracts
* Rinkeby: Verified: https://rinkeby.etherscan.io/address/0xAf9352B33E9B08A86dD04fcD8533DbC75BD2c8d1#contracts

TestToken Contract Address on Test Net
* Ropsten: Verified: https://ropsten.etherscan.io/address/0x0190f80487179053eb85451454541644AbAf4048#contracts
* Rinkeby: Verified: https://rinkeby.etherscan.io/address/0xb54039DAC3C4ADdAC082e86a6e9C290E80af9488#contracts


Current Admin on Test Net
* Ropsten, Rinkeby : 0x3349ca399168dF1c0df96a49410F5F9940241AbC
