import React from 'react';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const TopLayout = ({ children, left }) => {

  return (
    <Layout>
      <Header theme="light">{left}</Header>
      <Content style={{overflow:'hidden'}}>{children}</Content>
    </Layout>
  );
};

export default TopLayout;
