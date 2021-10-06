/**
 * 货单表字段配置页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React from 'react';
import {Input, Select as AntdSelect} from 'antd';
import Select from '@/components/Select';
import DatePicker from "@/components/DatePicker";
import * as apiUrl from '../OrderUrl';
import {contactsIdSelect} from "../OrderUrl";

const w = 200;

export const OrderId = (props) => {
  return (<Input   {...props} />);
};

export const contractName = (props) => {
  return (<Input   {...props} />);
};
// 收件人姓名
export const ContactsId = (props) => {
  return (<Select  api={apiUrl.OrderIdListSelect}{...props} />);
};

export const Customer = (props) =>{
  return (<Select api={apiUrl.customerIdSelect}   {...props}/>);
};

export const Phone = (props) => {
  return (<Select api={apiUrl.phoneSelect}   {...props}/>);
};

//  收件地址
export const AdressId = (props) => {
  return (<Select  api={apiUrl.locationListSelect}{...props} />);
};
// 货单数量
export const Number = (props) => {
  return (<Input  {...props} />);
};
//  货单状态
export const State = (props) => {
  return (<AntdSelect  options={[{label: '未审核', value: '未审核'}, {value: '已审核', label: '已审核'}]} {...props} />);
};
//  联系电话
export const ClientId = (props) => {
  return (<Input   {...props} />);
};
// 下单时间
export const OrderTime = (props) => {
  return (<DatePicker   {...props} />);
};
//  付款时间
export const PayTime = (props) => {
  return (<DatePicker   {...props} />);
};
// 出库时间
export const DeliveryId = (props) => {
  return (<Input   {...props} />);
};
// 产品名称
export const ItemId = (props) => {
  return (<Select api={apiUrl.ProductNameListSelect} {...props}/>);
};
export const CustomerListSelect = (props) => {
  return (<Select api={apiUrl.CustomerListSelect} {...props}/>);
};
//  产品金额
export const StockItemId = (props) => {
  return (<Input   {...props} />);
};

