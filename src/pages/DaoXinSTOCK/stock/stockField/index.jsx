/**
 * 仓库总表字段配置页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../stockUrl';
import StockPlaceList from '@/pages/DaoXinSTOCK/stock/stockEdit/placeList';
import PlaceEdit from '@/pages/DaoXinSTOCK/storehouse/storehouseEdit';
import Items from '@/pages/DaoXinSTOCK/stock/stockEdit/item';
import Drawer from '@/components/Drawer';
import ItemsEdit from '@/pages/DaoxinBOM/items/itemsEdit';
import EditButton from '@/components/EditButton';


const w = 200;

export const Palce = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input style={{width:w}}  {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索仓库
    </Button>
    <Drawer width={800} title="选择" component={StockPlaceList}  onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};

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
    <Drawer width={1000} title="选择" component={Items} onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};

export const PalceId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};

export const ItemId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select style={{width:w}}  api={apiUrl.brandIdSelect} {...props}/>);
};
export const Inventory = (props) =>{
  return (<Input  style={{width:w}} {...props}/>);
};
