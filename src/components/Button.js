import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  const onStakeClick = () => {
    props.stake();
  };
  const onUnStakeClick = () => {
    props.unstake();
  };

  return (
    <>
      <button
        className={
          props.buttonState === 'stake'
            ? classes.stakeButton
            : classes.unstakeButton
        }
        onClick={props.buttonState === 'stake' ? onStakeClick : onUnStakeClick}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
