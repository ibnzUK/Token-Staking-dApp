import React, { useState } from 'react';
import classes from './Staking.module.css';

const Staking = (props) => {
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    props.inputHandler(event.target.value);
  };

  const goMax = () => {
    setInputValue(props.userBalance);
    props.inputHandler(props.userBalance);
  };

  return (
    <div className={classes.Staking}>
      <h1>Yield Farming / Token Staking dApp</h1>
      <p>{props.account}</p>
      <h3>
        {props.apy}% (APY) - {props.apy / 365}% Daily Earnings
      </h3>
      <div className={classes.inputDiv}>
        <input
          className={classes.input}
          type="number"
          min="0"
          step="1"
          onChange={inputChangeHandler}
          value={inputValue}
        ></input>
      </div>
      <button
        className={classes.stakeButton}
        onClick={() => {
          props.stakeHandler();
          setInputValue('');
        }}
      >
        Stake
      </button>
      &nbsp; &nbsp;
      <button className={classes.unstakeButton} onClick={props.unStakeHandler}>
        Unstake All
      </button>
      <div className={classes.totals}>
        <h4>
          Total Staked (by all users): {props.totalStaked} TestToken (Tst){' '}
        </h4>

        <div>&nbsp;</div>
        <h5>My Stake: {props.myStake} TestToken (Tst) </h5>
        <h5>
          My Estimated Reward: {(props.myStake * 0.001).toFixed(3)} TestToken
          (Tst){' '}
        </h5>
        <h5 onClick={goMax} className={classes.goMax}>
          My balance: {props.userBalance} TestToken (Tst){' '}
        </h5>
      </div>
    </div>
  );
};

export default Staking;
