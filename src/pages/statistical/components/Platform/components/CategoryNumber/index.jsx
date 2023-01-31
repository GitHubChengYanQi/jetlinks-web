import React from 'react';
import styles from './index.module.less';

const CategoryNumber = ({categoryResults = []}) => {


  return <>
    <div className={styles.box}>
      <div className={styles.title}>
        不同种类设备数量
      </div>
      {
        categoryResults.sort((a, b) => b.deviceNum - a.deviceNum).map((item, index) => {
          return <div key={index} className={styles.category}>
            <div style={{width: 50}}>{index + 1}.</div>
            <div className={styles.name}>{item.name}</div>
            <div>{item.deviceNum}台</div>
          </div>;
        })
      }
    </div>
  </>;
};

export default CategoryNumber;
