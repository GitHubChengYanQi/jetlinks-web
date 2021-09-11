import {AutoComplete, Button, Popover} from 'antd';
import FastCreateCustomer from '@/pages/Crm/customer/components/FastCreateCustomer';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import React, {useEffect, useRef, useState} from 'react';


const AddCustomer = (props) => {


  const {value,onChange,visi,setVal} = props;

  const ref = useRef(null);

  useEffect(()=>{
    setVisible(false);
  },[visi]);



  const [visible, setVisible] = useState(false);


  const options = [
    {
      label: '选择新增客户',
      options: [{value: '0', label: '详细新增客户'}, {value: '1', label: '快速新增客户'}],
    },
  ];

  return (
    <>
      <Popover placement="rightTop" visible={visible} content={<FastCreateCustomer close={() => {
        setVisible(false);
      }} add={(value) => {
        setVisible(false);
        typeof setVal === 'function' && setVal(value && value.customerName);
        onChange(value && value.customerId);
      }} />} trigger="click">
        <AutoComplete
          dropdownMatchSelectWidth={120}
          style={{width: 100}}
          options={options}
          value={null}
          onChange={(value) => {
            if (value === '0') {
              ref.current.open(false);
              setVisible(false);
            } else if (value === '1') {
              setVisible(true);
            }
          }}
        >
          <Button type="primary" style={{backgroundColor: '#1890ff', color: '#fff'}}>新增客户</Button>
        </AutoComplete>
      </Popover>

      <CreateNewCustomer
        title="客户"
        model={CustomerEdit}
        widths={1600}
        onSuccess={() => {
          ref.current.close();
        }}
        refModal={ref}
        onChange={(res) => {
          if (res) {
            typeof setVal === 'function' && setVal(res && res.data && res.data.customerName);
            onChange(res && res.data && res.data.customerId);
          }
        }} />
    </>
  );
};

export default AddCustomer;
