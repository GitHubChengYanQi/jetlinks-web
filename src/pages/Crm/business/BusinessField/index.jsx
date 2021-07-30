/**
 * 商机表字段配置页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../BusinessUrl';
import {DatePicker2} from '@alifd/next';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/business/BusinessEdit/components/Customer';
import Stocks from '@/pages/Crm/track/TrackEdit/components/Stocks';

const w = 200;

export const ClitenId = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};
export const Source = (props) =>{
  return (<Select style={{width:w}} api={apiUrl.SourceIdSelect} {...props}/>);
};
export const Stock = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input  style={{width:w}} {...props}/>
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
    <Input style={{width:w}}  {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索客户
    </Button>
    <Drawer width={1500} title="选择" component={Index} onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} check={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};
export const TimeSearch = (props) =>{
    return (<DatePicker2 showTime style={{width:w}}  {...props}/>);
};
export const Time = (props) =>{
  return (<DatePicker2 showTime style={{width:w}}  {...props}/>);
};
export const State = (props) =>{
  return (<AntdSelect style={{width:w}}  options={[{value:'预测评估',label:'预测评估'},{value:'初期沟通',label:'初期沟通'},{value:'需求分析',label:'需求分析'}]} {...props}/>);
};
export const Stage = (props) =>{
  return (<AntdSelect style={{width:w}}  options={[{value:'预测评估',label:'预测评估'},{value:'初期沟通',label:'初期沟通'},{value:'需求分析',label:'需求分析'}]} {...props}/>);
};
export const Person = (props) =>{
  return (<Select style={{width:w}}  api={apiUrl.UserIdSelect}  {...props}  />);
};
