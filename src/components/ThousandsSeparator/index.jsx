import React from 'react';
import {Statistic} from 'antd';
import styles from './index.module.less';

const ThousandsSeparator = ({value, precision = 2}) => {


  return <Statistic
    className={styles.statistic}
    valueStyle={{fontSize: 14}}
    value={value}
    style={{display: 'inline-block'}}
    precision={precision}
  />;
};

export default ThousandsSeparator;
