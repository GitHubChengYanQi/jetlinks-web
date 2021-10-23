/**
 * 产品订单字段配置页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useEffect, useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../productOrderUrl';
import {customerListSelect, spuListSelect} from '../productOrderUrl';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import Modal from '@/components/Modal';
import SkuList from '@/pages/Erp/productOrder/components/SkuList';
import SpuAttribute from '@/pages/Erp/parts/components/SpuAttribute';

export const Number = (props) => {
  return (<InputNumber min={0} {...props} />);
};
export const Money = (props) => {
  return (<InputNumber min={0} {...props} />);
};
export const CustomerId = (props) => {
  return (<SelectCustomer  {...props} onChange={(value) => {
    props.onChange(value && value.customerId);
  }} />);
};

export const Customer = (props) => {
  return (<Select api={apiUrl.customerListSelect} {...props}/>);
};
export const CreateTime = (props) => {
  return (<Input {...props} />);
};
export const CreateUser = (props) => {
  return (<Input {...props} />);
};
export const UpdateTime = (props) => {
  return (<Input {...props} />);
};
export const UpdateUser = (props) => {
  return (<Input {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};
export const DeptId = (props) => {
  return (<Input {...props} />);
};

export const SkuId = (props) => {

  const {attribute,select,...other} = props;

 return (<SpuAttribute attribute={attribute} select={select} {...other} />);
};

export const SpuId = (props) => {

  const {onChange,spuId,select,...other} = props;

  useEffect(()=>{
    if (props.value){
      typeof spuId === 'function' && spuId(props.value);
    }
  },[]);

  return (<Select api={apiUrl.spuListSelect} {...other} onChange={(value)=>{
    typeof onChange === 'function' && onChange(value);
    typeof spuId === 'function' && spuId(value);
    typeof select === 'function' && select(value);
  }} />);
};
