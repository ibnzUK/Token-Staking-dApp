import React, { useState } from 'react';
import classes from './App.module.css';

const App = () => {
  const [account, setAccount] = useState('0x0');


  return (
    <div className={classes.Grid}>
      <div className={classes.Child}>
        <h1>Yield Farming / Token Staking dApp</h1>
        <p>account from Metamask: {account}</p>
        <div>
          <button className={classes.stakeButton}>Stake</button>&nbsp;
          <button className={classes.unstakeButton}>Unstake</button>
        </div>
      </div>
    </div>
  );
};

export default App;
