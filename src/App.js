import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import classes from './App.module.css';
import Button from './components/Button';
import TestToken from '../src/abis/TestToken.json';
import TokenStaking from '../src/abis/TokenStaking.json';

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
        let tempTotalStaked = await tokenStaking.methods
        .totalStaked()
        .call();
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

  const inputChangeHandler = (event) => {
    // todo !!!!!!!!!!!!!!!!    todo !!!!!!!!!!!!!!!! todo !!!!!!!!!!!!!!!! todo !!!!!!!!!!!!!!!! todo !!!!!!!!!!!!!!!! todo !!!!!!!!!!!!!!!! todo !!!!!!!!!!!!!!!!
    //need to check if is number and 0 >
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const stakeHandler = () => {
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
          });
      })
      .on('error', function(error) {
        console.log('Error Code:', error.code);
        console.log(error.message);
        setLoader(false);
      });

    setLoader(false);
    setInputValue('');
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
      .on('error', function(error) {
        console.log('Error Code:', error.code);
        console.log(error.message);
        setLoader(false);
      });

    setInputValue('');
  };

  const redistributeRewards = async () => {
    setLoader(true);
    // let convertToWei = window.web3.utils.toWei(inputValue, 'Ether')
    tokenStakingContract.methods
      .redistributeRewards()
      .send({ from: account })

      .on('transactionHash', (hash) => {
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
        <h1>Yield Farming / Token Staking dApp</h1>
        <p>{account}</p>
        <h3>0.1% Daily Earnings</h3>
        <div className={classes.inputDiv}>
          <input
            className={classes.input}
            type="text"
            onChange={inputChangeHandler}
            value={inputValue}
          ></input>
        </div>
        <Button buttonState={'stake'} stake={stakeHandler}>
          Stake
        </Button>
        &nbsp; &nbsp;
        <Button buttonState={'unstake'} unstake={unStakeHandler}>
          Unstake
        </Button>
        <div className={classes.totals}>
          <h4>Total Staked (by all users): {totalStaked} TestToken (Tst) </h4>
    
          <div>-</div>
          <h5>My Stake: {myStake} TestToken (Tst) </h5>
          <h5>
            My Estimated Reward: {(myStake * 0.001).toFixed(3)} TestToken (Tst){' '}
          </h5>
          <h5>My balance: {userBalance} TestToken (Tst) </h5>
        </div>
        <div className={classes.for_testing}>
          <p>FOR TESTING PURPOSE ONLY</p>
          <button>Claim for 1000 Tst (User)</button>
          &nbsp; &nbsp;
          <button onClick={redistributeRewards}>
            Redistribute rewards (Admin)
          </button>
          <div className={classes.network}>
            <p>
              Selected Network: <b>{network.name}</b>
              &nbsp; id: <b>{network.id}</b>
            </p>
            <p>Contract Balance: {contractBalance} TestToken (Tst) </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
