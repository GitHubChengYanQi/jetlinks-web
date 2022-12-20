import React from 'react';
import styles from './index.module.less';

const NumberReport = () => {


  return <div>
    <div className={styles.box}>
      <div className={styles.content} style={{borderRight: 'solid 1px #cacaca'}}>
        <div className={styles.label}>租户数量</div>
        <div className={styles.value}>7021</div>
        <div className={styles.describe}>总数量</div>
      </div>
      <div className={styles.content}>
        <div className={styles.label}>租户账号</div>
        <div className={styles.value} style={{color: '#03c4bf'}}>7000</div>
        <div className={styles.describe}>永久有效</div>
      </div>
      <div className={styles.content}>
        <div className={styles.label} style={{visibility: 'hidden'}}>-</div>
        <div className={styles.value} style={{color: '#f06161'}}>21</div>
        <div className={styles.describe}>即将到期</div>
      </div>
    </div>

    <div className={styles.box}>
      <div className={styles.content}>
        <div className={styles.label}>实时设备数量统计</div>
        <div className={styles.value}>7021</div>
        <div className={styles.describe}>总数量</div>
      </div>
      <div className={styles.content}>
        <div className={styles.label} style={{visibility: 'hidden'}}>-</div>
        <div className={styles.value} style={{color: '#03c4bf'}}>7000</div>
        <div className={styles.describe}>在线数</div>
      </div>
      <div className={styles.content}>
        <div className={styles.label} style={{visibility: 'hidden'}}>-</div>
        <div className={styles.value} style={{color: '#f06161'}}>21</div>
        <div className={styles.describe}>离线数</div>
      </div>
    </div>

    <div className={styles.box} style={{margin: 0}}>
      <div className={styles.content}>
        <div className={styles.label}>设备数量统计</div>
        <div className={styles.value}>7021</div>
        <div className={styles.describe}>总数量</div>
      </div>
      <div className={styles.content}>
        <div className={styles.label} style={{visibility: 'hidden'}}>-</div>
        <div className={styles.value} style={{color: '#03c4bf'}}>7000</div>
        <div className={styles.describe}>库存量</div>
      </div>
      <div className={styles.content}>
        <div className={styles.label} style={{visibility: 'hidden'}}>-</div>
        <div className={styles.value} style={{color: '#f06161'}}>21</div>
        <div className={styles.describe}>出库量</div>
      </div>
    </div>
  </div>;
};

export default NumberReport;
