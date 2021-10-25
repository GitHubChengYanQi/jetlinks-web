/**
 * 发货表字段配置页
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../deliveryUrl';
import {customerListSelect} from '@/pages/Erp/productOrder/productOrderUrl';

export const OutstockOrderId = (props) =>{
  return (<Select api={apiUrl.outstockOrderIdSelect} {...props}/>);
};
export const OutTime = (props) =>{
  return (<Input {...props}/>);
};

export const Customer = (props) =>{
  return (<Select api={customerListSelect} {...props}/>);
};
