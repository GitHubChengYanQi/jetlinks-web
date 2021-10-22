/**
 * 产品订单字段配置页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../productOrderUrl';
import {customerListSelect, spuListSelect} from '../productOrderUrl';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import Modal from '@/components/Modal';
import SkuList from '@/pages/Erp/productOrder/components/SkuList';

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

  const {attribute,onChange,value,...other} = props;
  console.log(value);

  const ref = useRef();

  return (<>
    <Button type='link' onClick={()=>{
      ref.current.open(attribute);
    }}>
      选择规格
    </Button>
    <Modal
      headTitle='选择规格'
      component={SkuList}
      ref={ref}
      onChange={(value)=>{
        onChange(value);
        ref.current.close();
      }}/>
  </>);
};

export const SpuId = (props) => {

  const {onChange,spuId,...other} = props;

  return (<Select api={apiUrl.spuListSelect} {...other} onChange={(value)=>{
    typeof onChange === 'function' && onChange(value);
    typeof spuId === 'function' && spuId(value);
  }} />);
};
