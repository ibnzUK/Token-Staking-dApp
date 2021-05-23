
# Token Staking dApp <h1>



###### Blockchain Token Staking dApp built with React, Solidity, on ethereum Ganache testnet <h6>


![Preview](src/assets/screenshot.png)

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
- [ ] Split components in to smaller
- [ ] Validate contracts
- [ ] Deploy on Ropsten
- [ ] Add different Staking pools
- [ ] Add clear running description








## Running instructions

* copy project to your directory ( git clone https://github.com/ibnzUK/Token-Staking-dApp )
* install project packages (npm install)
* start project (npm run start)


## For Testing
* To run tests from /test/TokenStaking (truffle test)

testing output
 ``` Contract: TokenStaking
    TestToken deployment
      ✓ token deployed and has a name (225ms)
    TokenStaking deployment
      ✓ staking contract deployed and has a name (146ms)
      ✓ staking contract has 500k TestTokens tokens inside (158ms)
    TokenStaking stakeTokens function
      ✓ users able to deposit (151ms)
      ✓ checking total staked before any stakes (157ms)
      ✓ aproving tokens, staking tokens, checking balance (1001ms)
      ✓ checking contract balance after staking (187ms)
      ✓ checking user balance inside contract (158ms)
      ✓ checking total staked (126ms)
      ✓ testing if user is staking at the moment (158ms)
      ✓ testing if user has staked (186ms)
    TokenStaking redistributeRewards function
      ✓ checking who can do redistribution (571ms)
      ✓ checking TokenStaking balance (142ms)
      ✓ checking user balance (157ms)
    TokenStaking unstakeTokens function
      ✓ checking users balance (578ms)
      ✓ checking total staked (174ms)
    Claim Tst
      ✓ trying to obtain test token (390ms)
```      


for private ethereum test network make sure Ganache is running on HTTP://127.0.0.1:7545


