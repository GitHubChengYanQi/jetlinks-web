import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {Col, Row, Space} from 'antd';
import CustomerSelect from '@/pages/Crm/customer/CustomerEdit/components/CustomerSelect';
import AddCustomerButton from '@/pages/Crm/customer/components/AddCustomerButton';


const SelectCustomer = (props) => {

  const {value, onChange,supply, width} = props;

  return (
    <>
      <Space>
        <CustomerSelect
          method={false}
          style={{width}}
          value={value}
          supply={supply}
          onChange={(value) => {
            onChange(value);
          }}
        />
        <AddCustomerButton {...props} onChange={(value) => {
          onChange(value);;
        }} />
      </Space>

    </>
  );
};
export default SelectCustomer;
