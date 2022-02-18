import React, {useState} from 'react';
import {Divider, Spin, Tree} from 'antd';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import ListLayout from '@/layouts/ListLayout';
import Select from '@/components/Select';
import {CustomerLevelIdSelect} from '@/pages/Crm/customer/CustomerUrl';
import store from '@/store';


const CustomerList = ({supply}) => {

  const [data] = store.useModel('dataSource');

  const crmCustomerLevel = (data && data.customerLevel) ? data.customerLevel.map((values) => {
    return {
      title: values.level,
      key: values.customerLevelId,
    };
  }) : [];


  const [status, setStatus] = useState();
  const [state, setState] = useState();
  const [level, setLevel] = useState();

  const [value, setValue] = useState();


  const Left = () => {
    return (
      <>
        {!supply &&
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
                title: '所有分类',
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
        </>
        }
        <Tree
          showLine
          onSelect={(value) => {
            setLevel(value);
          }}
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '所有级别',
              key: '',
              children: crmCustomerLevel
            },
          ]}
        />
      </>);
  };
  return (
    <ListLayout>
      <CustomerTable left={Left()} status={status} state={state} supply={supply || 0} level={level} />
    </ListLayout>
  );
};
export default CustomerList;
