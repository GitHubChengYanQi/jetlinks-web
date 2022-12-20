import React from 'react';
import styles from '@/pages/statistical/components/Tenant/index.module.less';

const Box = (
  {
    children
  }
) => {


  return <>
    <div className={styles.box}>
      <div className={styles.leftTop}/>
      <div className={styles.rightTop}/>
      <div className={styles.leftBottom}/>
      <div className={styles.rightBottom}/>


      {children}
    </div>
  </>;
};

export default Box;
