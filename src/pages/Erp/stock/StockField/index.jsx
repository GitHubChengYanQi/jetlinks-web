/**
 * 仓库总表字段配置页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import {Input, InputNumber,  Button} from 'antd';
import Select from '@/components/Select';
import Items from '@/pages/Erp/stock/StockEdit/components/Items';
import Drawer from '@/components/Drawer';
import * as apiUrl from '../StockUrl';

const w = 200;

export const Palce = (props) =>{
 return <Input {...props}/>;
};

export const Item = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input   {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索产品
    </Button>
    <Drawer width={1000} title="选择" component={Items} onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};

export const Storehouse = (props) =>{
  return (<Select width={300} api={apiUrl.storehouse}   {...props}/>);
};

export const ItemId = (props) =>{
  return (<Select api={apiUrl.itemIdSelect}   {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select width={200}  api={apiUrl.brandIdSelect} {...props}/>);
};
export const Inventory = (props) =>{
  return (<InputNumber min={0}   {...props}/>);
};
