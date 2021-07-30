import React from 'react';
import {Layout, Row, Col} from 'antd';

import styles from './index.module.less';

const {Header, Content} = Layout;

const TopLayout = ({children, leftMenu, rightMenu}) => {

  return (
    <Layout>
      <Header theme="light" className={styles.header}>
        <div className={styles.leftMenu}>{leftMenu}</div>
        <div className={styles.rightMenu}>{rightMenu}</div>
      </Header>
      <Content style={{overflowY: 'auto', height: 'calc(100vh - 112px)'}}>{children}</Content>
    </Layout>
  );
};

export default TopLayout;
