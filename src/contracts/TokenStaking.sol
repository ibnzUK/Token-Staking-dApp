pragma solidity ^0.5.0;

import "./TestToken.sol";

contract TokenStaking {
    string public name = "Yield Farming / Token dApp";
    TestToken public testToken;

    constructor(TestToken _testToken) public {
        testToken = _testToken;
    }
}
