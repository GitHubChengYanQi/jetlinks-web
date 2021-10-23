import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {Col, Row, Space} from 'antd';
import CustomerSelect from '@/pages/Crm/customer/CustomerEdit/components/CustomerSelect';
import AddCustomerButton from '@/pages/Crm/customer/components/AddCustomerButton';


const SelectCustomer = (props) => {

  const {value: values, onChange, style} = props;


  const [visible, setVisible] = useState(false);

  const [value, setValue] = useState(values);

  const [blur, setBlur] = useState();


  return (
    <>
      <Space>
        <CustomerSelect
          method={false}
          style={style}
          value={value}
          onSuccess={async (value) => {
            setValue(value && value.customerName);
            onChange(value);
            setBlur(true);
          }}
          onChange={(value) => {
            onChange(value);
            setValue(value);
            setVisible(true);
            setBlur(false);
          }}
          onblur={() => {
            if (!blur) {
              onChange(null);
            }
          }}
        />
        <AddCustomerButton {...props} visi={visible} onChange={(value) => {
          setValue(value && value.customerName);
          onChange(value);
          setBlur(true);
        }} />
      </Space>

    </>
  );
};
export default SelectCustomer;
