/**
 * 联系人表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, Select as AntSelect, InputNumber} from 'antd';
import Select from '@/components/Select';
import Drawer from '@/components/Drawer';
import {PlusOutlined} from '@ant-design/icons';
import CompanyRoleEdit from '@/pages/Crm/companyRole/companyRoleEdit';
import * as apiUrl from '../contactsUrl';
import {useRequest} from '@/util/Request';
import {value} from '@/pages/Portal/remind/remindField';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';


export const ContactsName = (props) => {
  return (<Input style={{width: 200}} {...props} />);
};
export const Job = (props) => {
  return (<Select  api={apiUrl.companyRoleSelect} {...props} />);
};
export const Phone = (props) => {
  return (<InputNumber min={0}   {...props} />);
};
export const DeptId = (props) => {
  return (<Input   {...props} />);
};

export const Customer = (props) => {
  return (<Select api={apiUrl.customerIdSelect}   {...props} />);
};

export const CustomerAdd = (props) => {
  props.onChange(props.customerId);
  return (<Input    {...props} />);
};

export const CompanyRole = (props) => {
  const ref = useRef(null);

  const {loading, data, run} = useRequest(apiUrl.companyRoleSelect);

  return (
    <div style={{hieght: 50}}>
      <AntSelect
        allowClear
        showSearch
        style={{width: 200}}
        options={data || []}
        loading={loading} {...props}
        filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} />
      <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
        ref.current.open(false);
      }} />
      <Drawer title="职位" ref={ref} onSuccess={() => {
        ref.current.close();
        run();
      }} component={CompanyRoleEdit} position={(res) => {
        props.onChange(res && res.data && res.data.companyRoleId);
      }} />
    </div>

  );
};

export const SelectCustomers = (props) => {

  useEffect(()=>{
    props.onChange(props.customer.customerId);
  },[]);


  return (
    <SelectCustomer {...props} value={props.customer && props.customer.customerName} onChange={(value)=>{
      props.onChange(value && value.customerId);
    }} />
  );
};

export const CustomerId = (props) => {

  const {customer} = props;
  if (customer !== null) {
    props.onChange(customer);
  }
  return (<Select disabled={customer} api={apiUrl.customerIdSelect} {...props} />);
};

export const CustomerIds = (props) => {
  return (<Select api={apiUrl.customerIdSelect} {...props} />);
};


export const PhoneNumber = (props) =>{
  return (<Input  {...props}/>);
};
