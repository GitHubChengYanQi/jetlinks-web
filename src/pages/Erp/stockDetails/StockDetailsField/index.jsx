/**
 * 仓库产品明细表字段配置页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import {Input, InputNumber, DatePicker, Button} from 'antd';
import Drawer from '@/components/Drawer';
import Stocks from '@/pages/Erp/stockDetails/StockDetailsEdit/components/Stocks';
import * as apiUrl from '../StockDetailsUrl/index';
import Select from '@/components/Select';

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
    }} ref={ref} ckeck={(id)=>{ onChange(id);ref.current.close();}}/>
  </>);
};
export const StockId = (props) =>{
  return (<Select api={apiUrl.stockIdSelect}   {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select api={apiUrl.stockIdSelect}   {...props}/>);
};
export const  Storehouse= (props) =>{
  return (<Select api={apiUrl.storehouseIdSelect}   {...props}/>);
};
export const Price = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const StorageTime = (props) =>{
  return (<DatePicker   {...props}/>);
};

