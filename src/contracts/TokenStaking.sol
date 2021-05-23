pragma solidity ^0.5.0;

import "./TestToken.sol";

contract TokenStaking {
    string public name = "Yield Farming / Token dApp";
    TestToken public testToken;

    //declaring owner state variable
    address public owner;
    //declaring total staked
    uint256 public totalStaked;

    mapping(address => uint256) public stakingBalance;
    //mapping list of users who ever staked
    mapping(address => bool) public hasStaked;
    //mapping list of users who are staking at the moment
    mapping(address => bool) public isStakingAtm;

    //array of all stakers
    address[] public stakers;

    constructor(TestToken _testToken) public {
        testToken = _testToken;

        //assigning owner on deployment
        owner = msg.sender;
    }

    //stake tokens

    function stakeTokens(uint256 _amount) public {
        //must be more than 0
        require(_amount > 0, "amount cannot be 0");

        //User adding test tokens
        testToken.transferFrom(msg.sender, address(this), _amount);
        totalStaked = totalStaked + _amount;

        //updating staking balance for user by mapping
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //checking if user staked before or not, if NOT staked adding to array of stakers
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //updating staking status
        hasStaked[msg.sender] = true;
        isStakingAtm[msg.sender] = true;
    }

    function unstakeTokens() public {
        //get staking balance for user
       
        uint256 balance = stakingBalance[msg.sender];

         //amount should be more than 0
        require(balance > 0, "amount has to more than 0");

        //transfer staked tokens back to user
        testToken.transfer(msg.sender, balance);
         totalStaked = totalStaked - balance;

        //reseting users staking balance
        stakingBalance[msg.sender] = 0;

        //updating staking status
        isStakingAtm[msg.sender] = false;
    }

    //airdropp tokens
    function redistributeRewards() public {
        //only owner can issue airdrop
        require(msg.sender == owner, "Only contract creator can redistribute");

        //doing drop for all addresses
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 apy = 1000;
            uint256 balance = stakingBalance[recipient] / apy;
            if (balance > 0) {
                testToken.transfer(recipient, balance);
            }
        }
    }
}
