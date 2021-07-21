/**
 * 订单表字段配置页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React from 'react';
import {Input, Select as AntdSelect} from 'antd';
import {DatePicker2} from '@alifd/next';
import Select from '@/components/Select';
import {ClientIdListSelect, orderBranchListSelect} from '@/pages/DaoxinOrder/order/orderUrl';
import * as apiUrl from '../orderUrl';


 export const OrderId = (props) =>{
   return(<Select api={apiUrl.orderBranchListSelect} {...props}/>);
};
export const Name = (props) =>{
  return(<Select api={apiUrl.ClientIdListSelect} {...props}/>);
};
export const AdressId = (props) =>{
  return (<Input {...props}/>);
};
export const Numbers = (props) =>{
  return (<Input {...props}/>);
};
export const State = (props) =>{
  return (<AntdSelect options={[{label:'未完成',value:'未完成'}, {value:'已完成',label:'已完成'}]} {...props}/>);
};
export const Phone = (props) =>{
  return (<Input {...props}/>);
};
export const OrderTime = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const PayTime = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const DeliveryTime = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const Total = (props) =>{
  return (<Input {...props}/>);
};
