import React from 'react';
import {Space} from 'antd';
import CustomerSelect from '@/pages/Crm/customer/CustomerEdit/components/CustomerSelect';
import AddCustomerButton from '@/pages/Crm/customer/components/AddCustomerButton';


const SelectCustomer = (props) => {

  const {value, onChange,supply = 0,placeholder, width,noAdd} = props;

  return (
    <>
      <>
        <CustomerSelect
          method={false}
          placeholder={placeholder}
          style={{width,marginRight:!noAdd && 8}}
          value={value}
          supply={supply}
          onChange={(value) => {
            onChange(value);
          }}
        />
        {!noAdd && <AddCustomerButton {...props} onChange={(value) => {
          onChange(value && value.customerId);
        }} />}
      </>

    </>
  );
};
export default SelectCustomer;
