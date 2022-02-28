import React from 'react';
import styles from './index.module.scss';

const EndNode = () => {
  return (<div className={styles.endNode}>
    <div className={styles.endNodeCircle}/>
    <div className={styles.endNodeText}>结束</div>
  </div>);
};

export default EndNode;
