/**
 * 出库表字段配置页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../deliveryUrl';
import Drawer from '@/components/Drawer';
import StockPlaceList from '@/pages/DaoXinSTOCK/stock/stockEdit/placeList';
import Stocks from '@/pages/DaoXinSTOCK/delivery/deliveryEdit/stock';
import {DatePicker2} from '@alifd/next';

export const Stock = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索库存
    </Button>
    <Drawer width={800} title="选择" component={Stocks}  onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};
export const StockId = (props) =>{
  return (<Input {...props}/>);
};
export const DeliveryTime = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const Number = (props) =>{
  return (<InputNumber {...props}/>);
};
export const Price = (props) =>{
  return (<InputNumber {...props}/>);
};
export const Brand = (props) =>{
  return (<Select api={apiUrl.brandSelect} {...props}/>);
};
