/**
 * 入库表字段配置页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../instockUrl';
import Drawer from '@/components/Drawer';
import Items from '@/pages/DaoXinSTOCK/instock/instockEdit/item';
import StockPlaceList from '@/pages/DaoXinSTOCK/instock/instockEdit/placeList';
import {DatePicker2} from '@alifd/next';

const w = 200;

export const Item = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input style={{width:w}}  {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索物品
    </Button>
    <Drawer width={1700} title="选择" component={Items}  onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};
export const ItemId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const RegisterTime = (props) =>{
  return (
    <DatePicker2 style={{width:w}}  {...props}/>
);
};
export const PlaceId = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input style={{width:w}}  {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索仓库
    </Button>
    <Drawer width={1300} title="选择" component={StockPlaceList}  onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};
export const Number = (props) =>{
  return (<InputNumber style={{width:w}}  {...props}/>);
};
export const Price = (props) =>{
  return (<InputNumber style={{width:w}}  {...props}  />);
};
export const BrandId = (props) =>{
  return (<Select style={{width:w}}  api={apiUrl.brandIdSelect} {...props}/>);
};
