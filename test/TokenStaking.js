const { assert, use } = require('chai');
const { default: Web3 } = require('web3');

const TestToken = artifacts.require('TestToken');
const TokenStaking = artifacts.require('TokenStaking');

require('chai')
  .use(require('chai-as-promised'))
  .should();

//helper function to convert tokens to ether
function tokenCorvert(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenStaking', ([creator, user]) => {
  let testToken, tokenStaking;

  before(async () => {
    //Load contracts
    testToken = await TestToken.new();
    tokenStaking = await TokenStaking.new(testToken.address);

    //transfer 500k to TokenStaking
    await testToken.transfer(tokenStaking.address, tokenCorvert('500000'));

    //sending some test tokens to User at address[1] { explaining where it comes from}
    await testToken.transfer(user, tokenCorvert('1000'), {
      from: creator,
    });
  });

  // Test 1
  // 1.1 Checking if Token contract has a same name as expected
  describe('TestToken deployment', async () => {
    it('token deployed and has a name', async () => {
      const name = await testToken.name();
      assert.equal(name, 'TestToken');
    });
  });

  // Test 2
  // 2.1 Checking if TokenStaking contract has a same name as expected
  describe('TokenStaking deployment', async () => {
    it('staking contract deployed and has a name', async () => {
      const name = await tokenStaking.name();
      assert.equal(name, 'Yield Farming / Token dApp');
    });

    // 2.2 Checking if TokenStaking contract has 500k of TestTokens
    it('staking contract has 500k TestTokens tokens inside', async () => {
      let balance = await testToken.balanceOf(tokenStaking.address);
      assert.equal(balance.toString(), tokenCorvert('500000'));
    });
  });

  // Test 3
  // 3.1 Testing stakeTokens function
  describe('TokenStaking stakeTokens function', async () => {
    let result;
    it('users able to deposit', async () => {
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('1000'),
        'users balance is correct before staking'
      );
    });

    //3.2 checking TokenStaking total banalce
    it('checking total staked before any stakes', async () => {
      result = await tokenStaking.totalStaked();
      assert.equal(
        result.toString(),
        tokenCorvert('0'),
        'total staked should be 0'
      );
    });

    // 3.3 Testing stakeTokens function
    it('aproving tokens, staking tokens, checking balance', async () => {
      //first aprove tokens to be staked
      await testToken.approve(tokenStaking.address, tokenCorvert('1000'), {
        from: user,
      });
      //stake tokens
      await tokenStaking.stakeTokens(tokenCorvert('1000'), { from: user });

      //check balance of user if they have 0 after staking
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('0'),
        'User balance after staking 1000'
      );
    });

    //3.4 checking balance of TokenStaking contract should be 500k +1000
    it('checking contract balance after staking', async () => {
      result = await testToken.balanceOf(tokenStaking.address);
      assert.equal(
        result.toString(),
        tokenCorvert('501000'),
        'Smart contract total balance after staking 1000'
      );
    });

    //3.5 checking TokenStaking contract users balance
    it('checking user balance inside contract', async () => {
      result = await tokenStaking.stakingBalance(user);
      assert.equal(
        result.toString(),
        tokenCorvert('1000'),
        'Smart contract balance for user'
      );
    });

    //3.6 checking TokenStaking totalstaked balance
    it('checking total staked', async () => {
      result = await tokenStaking.totalStaked();
      assert.equal(
        result.toString(),
        tokenCorvert('1000'),
        'total staked should be 1000'
      );
    });

    //3.7 checking isStaking function to see if user is staking
    it('testing if user is staking at the moment', async () => {
      result = await tokenStaking.isStakingAtm(user);
      assert.equal(result.toString(), 'true', 'user is currently staking');
    });

    //3.8 checking hasStaked function to see if user ever staked
    it('testing if user has staked', async () => {
      result = await tokenStaking.hasStaked(user);
      assert.equal(result.toString(), 'true', 'user has staked');
    });
  });

  //Test 4
  describe('TokenStaking redistributeRewards function', async () => {
    let result;
    // 4.1 checking who can issue tokens
    it('checking who can do redistribution', async () => {
      //issue tokens function from creator
      await tokenStaking.redistributeRewards({ from: creator });

      //issue tokens function from user, should not be able
      await tokenStaking.redistributeRewards({ from: user }).should.be.rejected;
    });

    // 4.2 checking balance of TokenStaking contract after redistribution
    it('checking TokenStaking balance', async () => {
      result = await testToken.balanceOf(tokenStaking.address);
      assert.equal(
        result.toString(),
        tokenCorvert('500999'),
        'Smart contract total balance after staking 1000'
      );
    });

    // 4.3 check balance of user after redistribution should be X / 1000
    it('checking user balance', async () => {
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('1'),
        'User total balance after redistribution 1'
      );
    });
  });

  // Test 5
  describe('TokenStaking unstakeTokens function', async () => {
    let result;
    // 5.1 Testing unstaking function
    it('checking users balance', async () => {
      await tokenStaking.unstakeTokens({ from: user });
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('1001'),
        'User balance after unstaking'
      );
    });

    //5.2 checking TokenStaking total staked balance
    it('checking total staked', async () => {
      result = await tokenStaking.totalStaked();
      assert.equal(
        result.toString(),
        tokenCorvert('0'),
        'total staked should be 0'
      );
    });

    // New test
    // it('checking value', async () => {
    //   result = 1;
    //   assert.equal(result, 1, 'expecting 1 ');
    // });
  });
});

//to run test - truffle test