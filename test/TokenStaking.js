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
    await testToken.transfer(user, tokenCorvert('2234'), {
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

    //2.2 checking default apy value
    it('checking default APY value', async () => {
      const value = await tokenStaking.defaultAPY();
      assert.equal(value, '100', 'default APY set to 100');
    });

    //2.3 checking custom apy value
    it('checking custom APY value', async () => {
      const value = await tokenStaking.customAPY();
      assert.equal(value, '137', 'custom APY set to 137');
    });

    // 2.4 Checking if TokenStaking contract has 500k of TestTokens
    it('staking contract has 500k TestTokens tokens inside', async () => {
      let balance = await testToken.balanceOf(tokenStaking.address);
      assert.equal(balance.toString(), tokenCorvert('500000'));
    });
  });

  // Test 3
  // 3.1 Testing stakeTokens function
  describe('TokenStaking stakeTokens function', async () => {
    let result;
    it('users balance is correct before staking', async () => {
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('2234'),
        'users balance is correct before staking'
      );
    });

    // 3.2 checking TokenStaking total banalce
    it('checking total staked before any stakes', async () => {
      result = await tokenStaking.totalStaked();
      assert.equal(
        result.toString(),
        tokenCorvert('0'),
        'total staked should be 0'
      );
    });

    // 3.3 Testing stakeTokens function
    it('approving tokens, staking tokens, checking balance', async () => {
      // first approve tokens to be staked
      await testToken.approve(tokenStaking.address, tokenCorvert('1000'), {
        from: user,
      });
      // stake tokens
      await tokenStaking.stakeTokens(tokenCorvert('1000'), { from: user });

      // check balance of user if they have 0 after staking
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('1234'),
        'User balance after staking 1234'
      );
    });

    // 3.4 checking balance of TokenStaking contract should be 500k +1000
    it('checking contract balance after staking', async () => {
      result = await testToken.balanceOf(tokenStaking.address);
      assert.equal(
        result.toString(),
        tokenCorvert('501000'),
        'Smart contract total balance after staking 1000'
      );
    });

    // 3.5 checking TokenStaking contract users balance
    it('checking user balance inside contract', async () => {
      result = await tokenStaking.stakingBalance(user);
      assert.equal(
        result.toString(),
        tokenCorvert('1000'),
        'Smart contract balance for user'
      );
    });

    // 3.6 checking TokenStaking totalstaked balance
    it('checking total staked', async () => {
      result = await tokenStaking.totalStaked();
      assert.equal(
        result.toString(),
        tokenCorvert('1000'),
        'total staked should be 1000'
      );
    });

    // 3.7 checking isStaking function to see if user is staking
    it('testing if user is staking at the moment', async () => {
      result = await tokenStaking.isStakingAtm(user);
      assert.equal(result.toString(), 'true', 'user is currently staking');
    });

    // 3.8 checking hasStaked function to see if user ever staked
    it('testing if user has staked', async () => {
      result = await tokenStaking.hasStaked(user);
      assert.equal(result.toString(), 'true', 'user has staked');
    });
  });

  // Test 4
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
        tokenCorvert('1235'),
        'User total balance after redistribution 1 + 1234'
      );
    });
  });

  // Test 5
  describe('TokenStaking unstakeTokens function', async () => {
    let result;
    // 5.1 Testing unstaking function
    it('unstaking and checking users balance after unstake', async () => {
      await tokenStaking.unstakeTokens({ from: user });
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('2235'),
        'User balance after unstaking 1000 + 1235'
      );
    });

    // 5.2 checking TokenStaking total staked balance
    it('checking total staked', async () => {
      result = await tokenStaking.totalStaked();
      assert.equal(
        result.toString(),
        tokenCorvert('0'),
        'total staked should be 0'
      );
    });
  });

  // Test 6
  describe('TokenStaking [custom] staking/unstaking functions', async () => {
    let result;
    // 6.1 checking TokenStaking total custom staking banalce
    it('checking total custom staked before any stakes', async () => {
      result = await tokenStaking.customTotalStaked();
      assert.equal(
        result.toString(),
        tokenCorvert('0'),
        'total staked should be 0'
      );
    });

    // 6.2 checking Users Balance before staking
    it('checking users balance before staking', async () => {
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('2235'),
        'User balance after staking 2235'
      );
    });

    // 6.3 testing if user able to stake in custom staking
    it('approving tokens, staking tokens, checking balance', async () => {
      // first approve tokens to be staked
      await testToken.approve(tokenStaking.address, tokenCorvert('1234'), {
        from: user,
      });
      // stake tokens
      await tokenStaking.customStaking(tokenCorvert('1234'), { from: user });

      // check balance of user if they have 1001 after staking
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('1001'),
        'User balance after staking 1001'
      );
    });

    // 6.4 check custom total staking balance
    it('checking custom total staked', async () => {
      result = await tokenStaking.customTotalStaked();
      assert.equal(
        result.toString(),
        tokenCorvert('1234'),
        'total staked should be 1234'
      );
    });

    // 6.5 checking customIsStakingAtm function to see if user is staking
    it('testing if user is staking at custom staking at the moment', async () => {
      result = await tokenStaking.customIsStakingAtm(user);
      assert.equal(result.toString(), 'true', 'user is currently staking');
    });

    // 6.6 checking customHasStaked function to see if user ever staked
    it('testing if user has staked at custom staking', async () => {
      result = await tokenStaking.customHasStaked(user);
      assert.equal(result.toString(), 'true', 'user has staked');
    });

    // 6.7 unstaking from custom staking and checking balance
    it('unstaking from custom staking and checking users balance ', async () => {
      await tokenStaking.customUnstake({ from: user });
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('2235'),
        'User balance after unstaking 1000 + 1235'
      );
    });
  });

  // Test 7
  describe('Claim Tst', async () => {
    let result;
    // 7.1 testing claim test token function
    it('trying to obtain 1000 test token', async () => {
      await tokenStaking.claimTst({ from: user });

      result = await testToken.balanceOf(user);
      assert.equal(result.toString(), tokenCorvert('3235'), '2235 + 1000');
    });
  });

  // Test 8
  describe('Change custom APY value', async () => {
    let result;

    // 8.1 testing who can change custom APY
    it('checking who can change APY', async () => {
      await tokenStaking.changeAPY('200', { from: creator });
      // testing with invalid arguments
      await tokenStaking.changeAPY({ from: creator }).should.be.rejected;
      await tokenStaking.changeAPY(tokenCorvert('0'), { from: creator }).should
        .be.rejected;
      await tokenStaking.changeAPY(tokenCorvert('200'), { from: user }).should
        .be.rejected;
    });

    // 8.2 checking New custom APY value
    it('checking new custom APY value', async () => {
      const value = await tokenStaking.customAPY();
      assert.equal(value, '200', 'custom APY set to 200 (0.2% Daily)');
    });
  });

  // Test 9
  describe('Testing custom APY reward redistribution', async () => {
    let result;
    // 9.1 redistributing custom APY rewards
    it('staking at customStaking', async () => {
      await testToken.approve(tokenStaking.address, tokenCorvert('1000'), {
        from: user,
      });
      // stake tokens
      await tokenStaking.customStaking(tokenCorvert('1000'), { from: user });
      // checking user balance after staking
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('2235'),
        'User balance after unstaking 3235 - 1000'
      );
    });
    // 9.2 issuing custom rewards
    it('redistributing rewards, checking who can redistribute', async () => {
      // issue customRewards function from creator
      await tokenStaking.customRewards({ from: creator });

      // issue customRewards function from user, should not be able
      await tokenStaking.customRewards({ from: user }).should.be.rejected;
    });
    // 9.2 checking new user balance after custom rewards
    it('checking user balance after custom APY rewards ', async () => {
      result = await testToken.balanceOf(user);
      assert.equal(
        result.toString(),
        tokenCorvert('2237'),
        'User balance after unstaking 2235 + 2'
      );
    });
  });
});

//to run test - truffle test
