/**
 * 仓库物品明细表字段配置页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Drawer from '@/components/Drawer';
import Stocks from '@/pages/DaoXinSTOCK/stockDetails/StockDetailsEdit/components/Stocks';
import {DatePicker2} from '@alifd/next';

const w = 200;
export const Stock = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);

  return (<>
    <Input style={{width:w}}  {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索库存
    </Button>
    <Drawer width={800} title="选择" component={Stocks}  onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{ onChange(id);ref.current.close();}}/>
  </>);
};
export const StockId = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const Price = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const StorageTime = (props) =>{
  return (<DatePicker2 style={{width:w}}  {...props}/>);
};

