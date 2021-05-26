require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync('.secret').toString().trim();
const infuraKey = fs.readFileSync('.infuraKey').toString().trim();


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${infuraKey}`
        );
      },
      network_id: 3,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  
    //RINKEBY Test net
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraKey}`
        );
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },

    

  },

  

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}


//truffle test




// call console - truffle console
// get contract - await TestToken.deployed()
// to compile -    truffle compile
// to deploy - truffle migrate --reset

