/**
 * 出库表字段配置页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useEffect, useRef, useState} from 'react';
import {Input,Select as AntSelect ,InputNumber} from 'antd';
import Select from '@/components/Select';
import Drawer from '@/components/Drawer';
import StockList from '@/pages/Erp/stock/StockList';
import DatePicker from '@/components/DatePicker';
import * as apiUrl from '../OutstockUrl';

const {Search} = Input;


export const Stock = (props) => {
  const {onChange, val} = props;
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
export const StockId = (props) => {
  return (<Input   {...props} />);
};
export const DeliveryTime = (props) => {
  return (<DatePicker   {...props} />);
};
export const Number = (props) => {
  return (<InputNumber   {...props} />);
};
export const Price = (props) => {
  return (<InputNumber   {...props} />);
};
export const BrandId = (props) => {
  const {storehouseid,state} = props;

  if (state){
    useEffect(()=>{
      props.onChange(null);
    },[storehouseid]);
  }



  const data = storehouseid ? storehouseid.map((value,index)=>{
    return {
      label : value.brandResult ? value.brandResult.brandName : null,
      value : value.brandId,
    };
  }) : null;

  return (<AntSelect options={data} style={{width:200}}  {...props} />);
};
export const ItemIdSelect = (props) => {
  const {storehouseid,itemid,state} = props;

  if (state){
    useEffect(()=>{
      props.onChange(null);
    },[storehouseid]);
  }


  const data = storehouseid ? storehouseid.map((value,index)=>{
    return {
      label : value.itemsResult ? value.itemsResult.name : null,
      value : value.itemId,
    };
  }) : null;

  return (<AntSelect options={data} style={{width:200}}  {...props} onChange={(value)=>{
    props.onChange(value);
    itemid ? itemid(value) : null;
  }} />);
};

export const StoreHouseSelect = (props) => {

  const {storehouseid, onChange} = props;

  return (<Select api={apiUrl.storeHouseSelect} {...props} onChange={(value) => {
    onChange(value);
    storehouseid(value);
  }} />);
};

// export const Items = (props) => {
//
//   const {storehouseid, onChange} = props;
//
//   return (<Select api={apiUrl.storeHouseSelect} {...props} />);
// };



