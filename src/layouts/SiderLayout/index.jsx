import React from 'react';
import { Layout } from 'antd';



const { Sider, Content } = Layout;

const SiderLayout = ({ children, left }) => {

  return (
    <Layout>
      <Sider theme="light" width={220}>{left}</Sider>
      <Content>{children}</Content>
    </Layout>
  );
};

export default SiderLayout;
