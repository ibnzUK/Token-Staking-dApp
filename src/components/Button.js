import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  console.log(props.buttonState);

  return (
    <>
      <button
        className={
          props.buttonState === 'stake'
            ? classes.stakeButton
            : classes.unstakeButton
        }
        onClick={props.buttonState === 'stake' ? props.stake : props.unstake}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
