/**
 * 出库表字段配置页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import {Input, InputNumber} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../OutstockUrl';
import Drawer from '@/components/Drawer';
import {DatePicker2} from '@alifd/next';
import StockList from '@/pages/Erp/stock/StockList';

const {Search} = Input;


export const Stock = (props) =>{
  const {onChange,val} = props;
  const [value, setValue] = useState(val);
  const ref = useRef(null);
  return (<>
    <Search style={{width: 200}} {...props} value={value} onSearch={() => {
      ref.current.open(false);
    }} enterButton />
    <Drawer width={1700} title="选择" component={StockList} onSuccess={() => {
      ref.current.close();
    }} ref={ref} choose={(choose) => {
      setValue(choose.name);
      onChange(choose.stockId);
      ref.current.close();
    }} />
  </>);
};
export const StockId = (props) =>{
  return (<Input   {...props}/>);
};
export const DeliveryTime = (props) =>{
  return (<DatePicker2   {...props}/>);
};
export const Number = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Price = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Brand = (props) =>{
  return (<Select   api={apiUrl.brandIdSelect} {...props}/>);
};
export const ItemsIdSelect = (props) =>{
  return (<Select   api={apiUrl.itemsIdSelect} {...props}/>);
};
