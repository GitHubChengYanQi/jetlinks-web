/**
 * 商机表字段配置页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../businessUrl';
import {DatePicker2} from '@alifd/next';
import Drawer from '@/components/Drawer';
import StockPlaceList from '@/pages/DaoXinSTOCK/instock/instockEdit/placeList';
import Clients from '@/pages/DaoXinBusiness/business/businessEdit/clients';
import Stocks from '@/pages/DaoXinBusiness/quotation/quotationEdit/stock';

export const ClitenId = (props) =>{
  return (<Input {...props}/>);
};
export const Source = (props) =>{
  return (<Select api={apiUrl.SourceIdSelect} {...props}/>);
};
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
export const Client = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索客户
    </Button>
    <Drawer width={1500} title="选择" component={Clients}  onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};
export const TimeSearch = (props) =>{
    return (<DatePicker2 {...props}/>);
};
export const Time = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const State = (props) =>{
  return (<AntdSelect options={[{value:'0',label:'预测评估'},{value:'1',label:'初期沟通'},{value:'2',label:'需求分析'}]} {...props}/>);
};
export const Stage = (props) =>{
  return (<AntdSelect options={[{value:'0',label:'预测评估'},{value:'1',label:'初期沟通'},{value:'2',label:'需求分析'}]} {...props}/>);
};
export const Person = (props) =>{
  return (<Input  {...props} />);
};
