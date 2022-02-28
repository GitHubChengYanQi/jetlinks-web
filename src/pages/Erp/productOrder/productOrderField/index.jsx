/**
 * 产品订单字段配置页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React from 'react';
import {
  Input,
} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../productOrderUrl';
import SpuAttribute from '@/pages/Erp/parts/components/SpuAttribute';
import SelectSpu from '@/pages/Erp/spu/components/SelectSpu';
import InputNumber from '@/components/InputNumber';

export const Number = (props) => {
  return (<InputNumber min={0} {...props} />);
};
export const State = (props) => {
  return (<Input min={0} {...props} />);
};
export const Money = (props) => {
  return (<InputNumber min={0} {...props} />);
};

export const Customer = (props) => {
  return (<Select api={apiUrl.customerListSelect} {...props} />);
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

  const {attribute, select, ...other} = props;
  return (<SpuAttribute attribute={attribute} select={select} {...other} />);
};

export const SpuId = (props) => {
  const { onChange,select, ...other} = props;

  return (<SelectSpu
    onChange={async (value) => {
      select(value);
      onChange(value);
    }}
    {...other} />);
};
