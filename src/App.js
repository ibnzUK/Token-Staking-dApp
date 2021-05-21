import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import classes from './App.module.css';
import Button from './components/Button';

const App = () => {
  const [account, setAccount] = useState('Connecting to Metamask..');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    //connecting to ethereum blockchain
    const ethEnabled = async () => {
      if (window.ethereum) {
        // await window.ethereum.send('eth_requestAccounts');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);

        //connecting to metamask
        let web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else if (!window.web3) {
        setAccount('Metamask is not detected');
      }
    };

    ethEnabled();
  }, []);

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const stakeHandler = () => {
    console.log('staking: ', inputValue);
    setInputValue('');
  };

  const unStakeHandler = () => {
    console.log('unstaking: ', inputValue);
    setInputValue('');
  };

  return (
    <div className={classes.Grid}>
      <div className={classes.Child}>
        <h1>Yield Farming / Token Staking dApp</h1>
        <p>{account}</p>
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
        &nbsp;
        <Button buttonState={'unstake'} unstake={unStakeHandler}>
          Unstake
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default App;
