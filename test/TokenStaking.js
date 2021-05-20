const { assert } = require('chai');
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

  // Test 1 checking if Token contract has a same name as expected
  describe('TestToken deployment', async () => {
    it('has a name', async () => {
      const name = await testToken.name();
      assert.equal(name, 'TestToken');
    });
  });
});
