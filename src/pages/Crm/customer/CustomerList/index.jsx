import React, {useState} from 'react';
import CustomerTable from '@/pages/Crm/customer/CustomerList/components/CustomerTable';
import {Divider, Layout, Tree} from 'antd';

import styles from './index.module.scss';

const {Sider, Content} = Layout;

const CustomerList = () => {

  const [status,setStatus] = useState();

  return (
    <Layout style={{height: '100%'}}>
      <Sider className={styles.sider} width={260}>
        <div style={{padding: 24}}>
          <Tree
            onSelect={(value)=>{
              setStatus(value);
            }}
            showLine
            // switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['']}
            // onSelect={this.onSelect}
            treeData={[
              {
                title: '所有客户',
                key: '',
                children: [
                  {
                    title: '潜在客户',
                    key: '0',
                  },
                  {
                    title: '正式客户',
                    key: '1',
                  },
                ],
              },
            ]}
          />
          <Divider />
          <Tree
            showLine
            // switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0']}
            // onSelect={this.onSelect}
            treeData={[
              {
                title: '客户分类',
                key: '0',
                children: [
                  {
                    title: '代理商',
                    key: '0-0',
                  },
                  {
                    title: '终端用户',
                    key: '0-1',
                  },
                ],
              },
            ]}
          />
          <Divider />
        </div>
      </Sider>
      <Content>
        <CustomerTable status={status} />
      </Content>
    </Layout>
  );
};
export default CustomerList;
