import React, { useState} from 'react';
import classes from './Navigation.module.css';

const Navigation = () => {
  const [poolStatus, setPoolStatus] = useState('default');

  const changePool = (val) => {
    setPoolStatus(val);
  };

  return (
    <div className={classes.navigation}>
      <button
        className={
          poolStatus === 'default'
            ? classes.buttonActive
            : classes.buttonNonActive
        }
        onClick={() => {
          changePool('default');
        }}
      >
        36.5% (APY)
      </button>
      <button
        className={
          poolStatus === 'custom'
            ? classes.buttonActive
            : classes.buttonNonActive
        }
        onClick={() => {
          changePool('custom');
        }}
      >
        50.05% (APY)
      </button>
    </div>
  );
};

export default Navigation;
