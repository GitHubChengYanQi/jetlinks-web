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


import * as apiUrl from '../OrderUrl';
// eslint-disable-next-line import/named

// eslint-disable-next-line import/named

// eslint-disable-next-line import/named

const w = 200;

 export const OrderId = (props) =>{
   return(<Input style={{width:w}}  {...props}/>);
};
                                                                             // 收件人姓名
export const ContactsId = (props) =>{
  return(<Select style={{width:w}}  api={apiUrl.OrderIdListSelect}{...props}/>);
};
                                                                              //  收件地址
export const AdressId = (props) =>{
  return(<Select style={{width:w}}  api={apiUrl.locationListSelect}{...props}/>);
};
                                                                                // 订单数量
export const Number = (props) =>{
  return (<Input  style={{width:w}} {...props}/>);
};
                                                                                //  订单状态
export const State = (props) =>{
  return (<AntdSelect style={{width:w}}  options={[{label:'未完成',value:'未完成'}, {value:'已完成',label:'已完成'}]} {...props}/>);
};
                                                                          //  联系电话
export const ClientId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
                                                                             // 下单时间
export const OrderTime = (props) =>{
  return (<DatePicker2 style={{width:w}}  {...props}/>);
};
                                                                              //  付款时间
export const PayTime = (props) =>{
  return (<DatePicker2 style={{width:w}}  {...props}/>);
};
                                                                                // 出库时间
export const DeliveryId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
                                                                               // 物品名称
export const ItemId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
                                                                          //  物品金额
export const StockItemId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
