/**
 * 出库单字段配置页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React from 'react';
import {Input, InputNumber} from 'antd';
import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import {storeHouseSelect} from '@/pages/Erp/outstock/OutstockUrl';
import * as apiUrl from '@/pages/Erp/outstockApply/outstockApplyUrl';

export const State = (props) =>{
  props.onChange(1);
  return (<Input {...props}/>);
};
export const Time = (props) =>{
  return (<DatePicker {...props}/>);
};
export const Storhouse = (props) =>{
  return (<Select api={storeHouseSelect} {...props}/>);
};
export const ApplyState = (props) =>{
  return (<Input {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select width={150} api={apiUrl.Brands} {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select width={150} api={apiUrl.Items} {...props}/>);
};

export const Number = (props) =>{
  return (<InputNumber {...props}/>);
};

