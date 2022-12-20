import React from 'react';
import styles from './index.module.less';

const CategoryNumber = () => {


  return <>
    <div className={styles.box}>
      <div className={styles.title}>
        不同种类设备数量
      </div>
      {
        [1, 2, 3].map((item, index) => {
          return <div key={index} className={styles.category}>
            <div>{index + 1}.</div>
            <div className={styles.name}>智能箱{index + 1}</div>
            <div>588台</div>
          </div>;
        })
      }
    </div>
  </>;
};

export default CategoryNumber;
