import React, {useState} from 'react';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import Select from '@/components/Select';
import {CustomerLevelIdSelect} from '@/pages/Crm/customer/CustomerUrl';
import ContactsList from '@/pages/Crm/contacts/components/ContactsTable';
import {customerIdSelect} from '@/pages/Crm/contacts/contactsUrl';
import ContactsTable from '@/pages/Crm/contacts/components/ContactsTable';


const CustomerList = () => {

  const {loading, data,run} = useRequest({url: '/customer/list', method: 'POST', rowKey: 'customerId'});

  const customer = data ? data.map((values) => {
    return {
      title: values.customerName,
      key: values.customerId,
    };
  }) : [];


  const [customerId, setCustomerId] = useState();

  const [value,setValue] = useState();



  const Left = () => {
    return (
      <>
        <div>
          <Select api={customerIdSelect} placeholder='搜索客户' value={value} bordered={false} notFoundContent={null} defaultActiveFirstOption={false} onChange={async (value)=>{
            await run(
              {
                data:{
                  customerId : value
                }
              }
            );
            setValue(value);
          }} />
        </div>
        <Tree
          showLine
          onSelect={(value) => {
            setCustomerId(value);
          }}
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '所有客户',
              key: '',
              children: customer
            },
          ]}
        />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      <ContactsTable customerId={customerId} />
    </ListLayout>
  );
};
export default CustomerList;
