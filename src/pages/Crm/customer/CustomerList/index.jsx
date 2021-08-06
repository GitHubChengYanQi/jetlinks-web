import React, {useState} from 'react';
import CustomerTable from '@/pages/Crm/customer/CustomerList/components/CustomerTable';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';


const CustomerList = () => {

  const [status, setStatus] = useState();
  const [state, setState] = useState();

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
      </>);
  };
  return (
    <ListLayout left={Left()}>
      <CustomerTable status={status} state={state} />
    </ListLayout>
  );
};
export default CustomerList;
