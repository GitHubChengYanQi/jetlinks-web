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

export const OrderId = (props) => {
  return (<Input   {...props} />);
};

export const Name = (props) => {
  return (<Input   {...props} />);
};
// 收件人姓名
export const ContactsId = (props) => {
  return (<Select  api={apiUrl.OrderIdListSelect}{...props} />);
};
//  收件地址
export const AdressId = (props) => {
  return (<Select  api={apiUrl.locationListSelect}{...props} />);
};
// 订单数量
export const Number = (props) => {
  return (<Input  {...props} />);
};
//  订单状态
export const State = (props) => {
  return (<AntdSelect  options={[{label: '未完成', value: '未完成'}, {value: '已完成', label: '已完成'}]} {...props} />);
};
//  联系电话
export const ClientId = (props) => {
  return (<Input   {...props} />);
};
// 下单时间
export const OrderTime = (props) => {
  return (<DatePicker2   {...props} />);
};
//  付款时间
export const PayTime = (props) => {
  return (<DatePicker2   {...props} />);
};
// 出库时间
export const DeliveryId = (props) => {
  return (<Input   {...props} />);
};
// 产品名称
export const ItemId = (props) => {
  return (<Input   {...props} />);
};
//  产品金额
export const StockItemId = (props) => {
  return (<Input   {...props} />);
};
