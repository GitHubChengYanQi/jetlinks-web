import React from 'react';

import BusinessTable from '@/pages/Crm/business/BusinessList/components/BusinessTable';
import { Layout, Tree} from 'antd';

import styles from '@/pages/Crm/business/BusinessDetails/index.module.scss';

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
                title: '商机管理',
                key: '0',
                children: [
                  {
                    title: '商机2.0明细',
                    key: '0-0',
                  },
                  {
                    title: '商机2.0明细',
                    key: '0-1',
                  },
                ],
              },
            ]}
          />

        </div>
      </Sider>
      <Content>
        <BusinessTable />
      </Content>
    </Layout>
  );
};
export default BusinessList;
