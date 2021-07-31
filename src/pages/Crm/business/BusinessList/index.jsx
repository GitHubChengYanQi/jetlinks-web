import React from 'react';
import {Divider, Layout, Tree} from 'antd';
import BusinessTable from '@/pages/Crm/business/BusinessList/BusinessTable';
import styles from './index.module.scss';

const {Sider, Content} = Layout;

const BusinessList = () => {

  return (
    <Layout style={{height: '100%'}}>
      <Sider className={styles.sider} width={260}>
        <div style={{padding: 24}}>
          <Tree
            showLine
            // switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0']}
            // onSelect={this.onSelect}
            treeData={[
              {
                title: '销售流程',
                key: '0',
                children: [
                  {
                    title: '流程1',
                    key: '0-0',
                  },
                  {
                    title: '流程2',
                    key: '0-1',
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
                title: '所有来源',
                key: '0',
                children: [
                  {
                    title: '网站',
                    key: '0-0',
                  },
                  {
                    title: '线下',
                    key: '0-1',
                  },
                  {
                    title: '公众号',
                    key: '0-2',
                  },
                ],
              },
            ]}
          />
          <Divider />
        </div>
      </Sider>
      <Content>
        <BusinessTable />
      </Content>
    </Layout>
  );
};
export default BusinessList;
