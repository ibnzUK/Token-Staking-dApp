import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import classes from './App.module.css';
import TestToken from '../src/abis/TestToken.json';
import TokenStaking from '../src/abis/TokenStaking.json';
import Staking from './components/Staking';
import AdminTesting from './components/AdminTesting';
import Navigation from './components/Navigation';

const App = () => {
  const [account, setAccount] = useState('Connecting to Metamask..');

  const [testTokenContract, setTestTokenContract] = useState('');
  const [tokenStakingContract, setTokenStakingContract] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [contractBalance, setContractBalance] = useState('');
  const [totalStaked, setTotalStaked] = useState('');
  const [myStake, setMyStake] = useState('');
  const [loader, setLoader] = useState(true);
  const [network, setNetwork] = useState({ id: '0', name: 'none' });
  const [userBalance, setUserBalance] = useState('none');


  useEffect(() => {
    //connecting to ethereum blockchain
    const ethEnabled = async () => {
      fetchDataFromBlockchain();
    };

    ethEnabled();
  }, []);

  const fetchDataFromBlockchain = async () => {
    if (window.ethereum) {
      // await window.ethereum.send('eth_requestAccounts');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);

      //connecting to metamask
      let web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      //loading users network ID and name
      const networkId = await web3.eth.net.getId();
      const networkType = await web3.eth.net.getNetworkType();
      setNetwork({ ...network, id: networkId, name: networkType });

      //loading TestToken contract data
      const testTokenData = TestToken.networks[networkId];
      if (testTokenData) {
        let web3 = window.web3;
        const testToken = new web3.eth.Contract(
          TestToken.abi,
          testTokenData.address
        );
        setTestTokenContract(testToken);
        //  fetching balance of Testtoken and storing in state
        let testTokenBalance = await testToken.methods
          .balanceOf(accounts[0])
          .call();
        let convertedBalance = window.web3.utils.fromWei(
          testTokenBalance.toString(),
          'Ether'
        );
        setUserBalance(convertedBalance);

        //fetching contract balance
        //updating total staked balance
        const tempBalance = TokenStaking.networks[networkId];
        let totalStaked = await testToken.methods
          .balanceOf(tempBalance.address)
          .call();

        convertedBalance = window.web3.utils.fromWei(
          totalStaked.toString(),
          'Ether'
        );
        //removing initial balance
        setContractBalance(convertedBalance);
      } else {
        window.alert(
          'TestToken contract is not deployed on this network, please change to testnet'
        );
      }

      //loading TokenStaking contract data
      const tokenStakingData = TokenStaking.networks[networkId];

      if (tokenStakingData) {
        let web3 = window.web3;
        const tokenStaking = new web3.eth.Contract(
          TokenStaking.abi,
          tokenStakingData.address
        );
        setTokenStakingContract(tokenStaking);
        //  fetching total staked TokenStaking  and storing in state
        let myStake = await tokenStaking.methods
          .stakingBalance(accounts[0])
          .call();

        let convertedBalance = window.web3.utils.fromWei(
          myStake.toString(),
          'Ether'
        );
        setMyStake(convertedBalance);

        //checking totalStaked
        let tempTotalStaked = await tokenStaking.methods.totalStaked().call();
        convertedBalance = window.web3.utils.fromWei(
          tempTotalStaked.toString(),
          'Ether'
        );
        setTotalStaked(convertedBalance);
      } else {
        window.alert(
          'TokenStaking contract is not deployed on this network, please change to testnet'
        );
      }
      //removing loader
      setLoader(false);
    } else if (!window.web3) {
      setAccount('Metamask is not detected');

      setLoader(false);
    }
  };

  const inputHandler = (received) => {
    setInputValue(received);
  };

  const stakeHandler = () => {
    if (!inputValue || inputValue === '0' || inputValue < 0) {
      setInputValue('');
    } else {
      setLoader(true);
      let convertToWei = window.web3.utils.toWei(inputValue, 'Ether');
      //aproving tokens for spending
      testTokenContract.methods
        .approve(tokenStakingContract._address, convertToWei)
        .send({ from: account })
        .on('transactionHash', (hash) => {
          tokenStakingContract.methods
            .stakeTokens(convertToWei)
            .send({ from: account })
            .on('transactionHash', (hash) => {
              setLoader(false);
              fetchDataFromBlockchain();
            })
            .on('receipt', (receipt) => {
              setLoader(false);
              fetchDataFromBlockchain();
            })
            .on('confirmation', (confirmationNumber, receipt) => {
              setLoader(false);
              fetchDataFromBlockchain();
            });
        })
        .on('error', function(error) {
          console.log('Error Code:', error.code);
          console.log(error.message);
          setLoader(false);
        });

      setLoader(false);
      setInputValue('');
    }
  };

  const unStakeHandler = () => {
    setLoader(true);
    // let convertToWei = window.web3.utils.toWei(inputValue, 'Ether')
    tokenStakingContract.methods
      .unstakeTokens()
      .send({ from: account })
      .on('transactionHash', (hash) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })
      .on('receipt', (receipt) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })

      .on('error', function(error) {
        console.log('Error Code:', error.code);
        console.log(error.message);
        setLoader(false);
      });

    setInputValue('');
  };

  const redistributeRewards = async () => {
    setLoader(true);
    tokenStakingContract.methods
      .redistributeRewards()
      .send({ from: account })

      .on('transactionHash', (hash) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })
      .on('receipt', (receipt) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })
      .on('error', function(error) {
        console.log('Error Code:', error.code);
        console.log(error.code);
        setLoader(false);
      });
  };
  const claimTst = async () => {
    setLoader(true);

    tokenStakingContract.methods
      .claimTst()
      .send({ from: account })
      .on('transactionHash', (hash) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })
      .on('receipt', (receipt) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        setLoader(false);
        fetchDataFromBlockchain();
      })
      .on('error', function(error) {
        console.log('Error Code:', error.code);
        console.log(error.code);
        setLoader(false);
      });
  };



  return (
    <div className={classes.Grid}>
      {loader ? <div className={classes.curtain}></div> : null}
      <div className={classes.loader}></div>

      <div className={classes.Child}>
       <Navigation/>
        <div>
          <Staking
            account={account}
            totalStaked={totalStaked}
            myStake={myStake}
            userBalance={userBalance}
            unStakeHandler={unStakeHandler}
            stakeHandler={stakeHandler}
            inputHandler={inputHandler}
          />
        </div>

        <div className={classes.for_testing}>
          <AdminTesting
            network={network}
            tokenStakingContract={tokenStakingContract}
            contractBalance={contractBalance}
            redistributeRewards={redistributeRewards}
            claimTst={claimTst}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
