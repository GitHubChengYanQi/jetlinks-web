/**
 * 出库表字段配置页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useEffect, useRef, useState} from 'react';
import {Input, Select as AntSelect, InputNumber} from 'antd';
import Select from '@/components/Select';
import Drawer from '@/components/Drawer';
import StockList from '@/pages/Erp/stock/StockList';
import DatePicker from '@/components/DatePicker';
import * as apiUrl from '../OutstockUrl';
import StockTable from '@/pages/Erp/stock/components/StockTable';

const {Search} = Input;


export const StockId = (props) => {

  const {onchange,onChange} = props;


  const ref = useRef(null);

  return (
    <>
      <Search style={{width: 200}} onSearch={() => {
        ref.current.open(false);
      }} enterButton {...props} />
      <Drawer width={1700} title="选择" component={StockTable} onSuccess={() => {
        ref.current.close();
      }} ref={ref} choose={(record) => {
        onchange(record);
        onChange(record.stockId);
      }}
      />
    </>);
};
export const Storehouse = (props) => {
  const {val,onChange} = props;
  onChange(val ? val.storehouseId : null);
  // eslint-disable-next-line no-nested-ternary
  return (<Input style={{width:200}} value={val ? (val.storehouseResult ? val.storehouseResult.name : null) : null} disabled   />);
};
export const Items = (props) => {
  const {val,onChange} = props;
  onChange(val ? val.itemId : null);

  // eslint-disable-next-line no-nested-ternary
  return (<Input style={{width:200}} value={val ? (val.itemsResult ? val.itemsResult.name : null) : null}  disabled />);
};
export const Brand = (props) => {
  const {val,onChange} = props;
  onChange(val ? val.brandId : null);

  // eslint-disable-next-line no-nested-ternary
  return (<Input style={{width:200}} value={val ? (val.brandResult ? val.brandResult.brandName : null) : null} disabled />);
};

export const Number = (props) => {
  return (<InputNumber   {...props} />);
};
export const OutstockOrderId = (props) => {
  props.onChange(props.val);
  return (<Input   {...props} />);
};



