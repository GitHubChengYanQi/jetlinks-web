import React from 'react';
import {Divider, Layout, Tree} from 'antd';
import BusinessTable from '@/pages/Crm/business/BusinessList/components/BusinessTable'
import styles from '@/pages/Crm/business/BusinessList/index.module.scss';
import {useRequest} from '@/util/Request';
const {Sider, Content} = Layout;

const BusinessList = () => {

  const {loading, data} = useRequest({ url: '/crmBusinessSales/list',method: 'POST',rowKey:'salesId'});
  const {loading:log, data:da} = useRequest({  url: '/origin/list',method: 'POST',rowKey:'originId'});

  // console.log(data);
  const crmBusinessSales = data ? data.map((values)=>{
    return {
      title: values.name,
      key:values.salesId,
    };
  }) : [];

  const origin = da ? da.map((values)=>{
    return {
      title: values.name,
      key:values.salesId,
    };
  }) : [];



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
                children: crmBusinessSales,
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
                children: origin,
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
