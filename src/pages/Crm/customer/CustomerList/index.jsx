import React, {useState} from 'react';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import {Divider, Spin, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import Select from '@/components/Select';
import {CustomerLevelIdSelect} from '@/pages/Crm/customer/CustomerUrl';
import ProSkeleton from '@ant-design/pro-skeleton';


const CustomerList = () => {

  const {loading, data,run} = useRequest({url: '/crmCustomerLevel/list', method: 'POST', rowKey: 'customerLevelId'});

  const crmCustomerLevel = data ? data.map((values) => {
    return {
      title: values.level,
      key: values.customerLevelId,
    };
  }) : [];


  const [status, setStatus] = useState();
  const [state, setState] = useState();
  const [level, setLevel] = useState();

  const [value,setValue] = useState();



  const Left = () => {
    if (loading){
      return (<div style={{textAlign:'center',marginTop:50}}> <Spin size="large" /></div>);
    }
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
        <div>
          <Select api={CustomerLevelIdSelect} placeholder='搜索级别' value={value} bordered={false} notFoundContent={null} defaultActiveFirstOption={false} onChange={async (value)=>{
            await run(
              {
                data:{
                  customerLevelId : value
                }
              }
            );
            setValue(value);
          }} />
        </div>
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
      <CustomerTable left={Left()} status={status} state={state} level={level} />
    </ListLayout>
  );
};
export default CustomerList;
