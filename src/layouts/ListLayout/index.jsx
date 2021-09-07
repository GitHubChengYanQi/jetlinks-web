import React from 'react';
import {Layout} from 'antd';
import styles from './index.module.scss';

const {Sider, Content} = Layout;

const ListLayout = ({left, children}) => {


  return (
    <Layout style={{height: '100%'}}>
      <Sider className={styles.sider} width={210}>
        <div style={{padding: 8}}>
          {left}
        </div>
      </Sider>
      <Content
        // style={{marginLeft: 260}}
      >
        {children}
      </Content>
    </Layout>
  );
};
export default ListLayout;
