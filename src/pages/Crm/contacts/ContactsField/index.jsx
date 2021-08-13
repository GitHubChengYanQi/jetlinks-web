/**
 * 联系人表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef, useState} from 'react';
import {Input, InputNumber} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../contactsUrl';
import Drawer from '@/components/Drawer';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import Search from 'antd/es/input/Search';



export const ContactsName = (props) =>{
  return (<Input  {...props}/>);
};
export const Job = (props) =>{
  return (<Input   {...props}/>);
};
export const Phone = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input   {...props}/>);
};

export const Customer = (props) =>{
  return (<Select api={apiUrl.customerIdSelect}   {...props}/>);
};
export const CustomerAdd = (props) =>{
  props.onChange(props.customerId);
  return (<Input    {...props}/>);
};

export const CustomerId = (props) =>{
 return (<Select api={apiUrl.customerIdSelect} {...props} />);
};
