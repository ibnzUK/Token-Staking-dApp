import React, { useState } from 'react';
import classes from './App.module.css';
import Button from './components/Button';

const App = () => {
  const [account, setAccount] = useState('0x0');

  const stakeHandler = () => {
    console.log('stake');
  };

  const unStakeHandler = () => {
    console.log('unstake');
    setAccount('0x0');
  };

  return (
    <div className={classes.Grid}>
      <div className={classes.Child}>
        <h1>Yield Farming / Token Staking dApp</h1>
        <p>account from Metamask: {account}</p>
        <div className={classes.inputDiv}>
          <input className={classes.input} type="text"></input>
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
