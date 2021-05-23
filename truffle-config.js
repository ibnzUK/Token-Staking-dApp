require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },

  // networks: {
  //   ropsten: {
  //     provider: function() {
  //       return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/YOUR-PROJECT-ID");
  //     },
  //     network_id: '3',
  //   },
  //   test: {
  //     provider: function() {
  //       return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
  //     },
  //     network_id: '*',
  //   },
  // },


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

