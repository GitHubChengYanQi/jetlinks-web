import React from 'react';
import {Space} from 'antd';
import CustomerSelect from '@/pages/Crm/customer/CustomerEdit/components/CustomerSelect';
import AddCustomerButton from '@/pages/Crm/customer/components/AddCustomerButton';


const SelectCustomer = (props) => {

  const {value, onChange,supply = 0, width} = props;

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
          onChange(value && value.customerId);
        }} />
      </Space>

    </>
  );
};
export default SelectCustomer;
