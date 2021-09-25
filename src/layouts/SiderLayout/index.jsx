import React from 'react';
import { Layout } from 'antd';



const { Sider, Content } = Layout;

const SiderLayout = ({ children, left }) => {

  return (
    <Layout>
      <Sider theme="light" width={200}>{left}</Sider>
      <Content style={{overflow:'hidden'}}>{children}</Content>
    </Layout>
  );
};

export default SiderLayout;
