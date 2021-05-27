
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
- [ ] Add frontend for custom pool
- [ ] Implement different APY Pool reward redistribution
- [ ] Add loader, indicator
- [ ] Split components in to smaller
- [ ] Validate contracts
- [ ] Add different Staking pools [doing]
- [ ] Add clear running description








## Running instructions

* copy project to your directory ( git clone https://github.com/ibnzUK/Token-Staking-dApp )
* install project packages (npm install)
* start project (npm run start)


## For Testing
* To run tests from /test/TokenStaking (truffle test)

mocha testing output
 ``` Contract: TokenStaking
    TestToken deployment
      ✓ token deployed and has a name (209ms)
    TokenStaking deployment
      ✓ staking contract deployed and has a name (83ms)
      ✓ checking default APY value (109ms)
      ✓ checking custom APY value (146ms)
      ✓ staking contract has 500k TestTokens tokens inside (105ms)
    TokenStaking stakeTokens function
      ✓ users balance is correct before staking (139ms)
      ✓ checking total staked before any stakes (106ms)
      ✓ aproving tokens, staking tokens, checking balance (1034ms)
      ✓ checking contract balance after staking (84ms)
      ✓ checking user balance inside contract (109ms)
      ✓ checking total staked (81ms)
      ✓ testing if user is staking at the moment (153ms)
      ✓ testing if user has staked (99ms)
    TokenStaking redistributeRewards function
      ✓ checking who can do redistribution (1259ms)
      ✓ checking TokenStaking balance (136ms)
      ✓ checking user balance (95ms)
    TokenStaking unstakeTokens function
      ✓ unstaking and checking users balance after unstake (620ms)
      ✓ checking total staked (174ms)
    TokenStaking [custom] staking/unstaking functions
      ✓ checking total custom staked before any stakes (189ms)
      ✓ checking usrs balance before staking (128ms)
      ✓ aproving tokens, staking tokens, checking balance (945ms)
      ✓ checking custom total staked (143ms)
      ✓ testing if user is staking at custom staking at the moment (124ms)
      ✓ testing if user has staked at custom staking (157ms)
      ✓ unstaking from custom staking and checking users balance  (683ms)
    Claim Tst
      ✓ trying to obtain 1000 test token (373ms)
    Change custom APY value
      ✓ checking who can change APY (1069ms)
      ✓ checking new custom APY value (172ms)
```      


for private ethereum test network make sure Ganache is running on HTTP://127.0.0.1:7545

Smart Contract Address on Test Net
Ropsten: 0xABa3314745b3eBCF91Eb4a61f695fc55B81119eF
Rinkeby: 0xB18D4a5D7bc8450A957f7AD1675D5e606d4482B0

Token Contract Address on Test Net
Ropsten: 0xC8B88a647b0c3D2CCce7bD561C8285c1FaA79b15
Rinkeby: 0xEc8E737d460B5DbD62E9B3062b6e7E472FCe2B06
