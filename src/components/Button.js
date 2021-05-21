import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {



  const onStakeClick = () => {
    console.log('boom1');
  };
  const onUnStakeClick = () => {
    console.log('boom2');
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
