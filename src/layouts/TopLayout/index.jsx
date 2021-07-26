import React from 'react';
import { Layout } from 'antd';

import styles from './index.module.less';

const { Header, Content } = Layout;

const TopLayout = ({ children, left }) => {

  return (
    <Layout>
      <Header theme="light" className={styles.header}>{left}</Header>
      <Content style={{overflowY:'auto',height:200}}>{children}</Content>
    </Layout>
  );
};

export default TopLayout;
