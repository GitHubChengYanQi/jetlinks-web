import React, {useState} from 'react';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';


const CustomerList = () => {

  const {loading, data} = useRequest({ url: '/crmCustomerLevel/list',method: 'POST',rowKey:'customerLevelId'});

  const crmCustomerLevel = data ? data.map((values)=>{
    return {
      title: values.level,
      key:values.customerLevelId,
    };
  }) : [];


  const [status, setStatus] = useState();
  const [state, setState] = useState();
  const [level, setLevel] = useState();

  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
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
          onSelect={(value) => {
            setState(value);
          }}
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '客户分类',
              key: '',
              children: [
                {
                  title: '代理商',
                  key: '0',
                },
                {
                  title: '终端用户',
                  key: '1',
                },
              ],
            },
          ]}
        />
        <Divider />
        <Tree
          showLine
          onSelect={(value) => {
            setLevel(value);
          }}
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '客户级别',
              key: '',
              children: crmCustomerLevel
            },
          ]}
        />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      <CustomerTable status={status} state={state} level={level} />
    </ListLayout>
  );
};
export default CustomerList;
