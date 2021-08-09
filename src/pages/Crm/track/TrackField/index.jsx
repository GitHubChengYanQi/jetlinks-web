/**
 * 报价表字段配置页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Drawer from '@/components/Drawer';
import Busines from '@/pages/Crm/track/TrackEdit/components/Busines';
import Stocks from '@/pages/Crm/track/TrackEdit/components/Stocks';
import {DatePicker2} from '@alifd/next';
import TextArea from 'antd/es/input/TextArea';

const w = 200;

export const BusinessId = (props) =>{
  return (<Input  {...props}/>);
};
export const StockId = (props) =>{
  return (<Input   {...props}/>);
};
export const Money = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Number = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Time = (props) =>{
  return (<DatePicker2  showTim s  {...props}/>);
};
export const Business = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input   {...props}/>
    <Button className='placeName' onClick={()=>{
      ref.current.open(false);}}>
      搜索商机列表
    </Button>
    <Drawer width={1500} title="选择" component={Busines}  onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};

export const Stock = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input   {...props}/>
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
export const Stage = (props) =>{
  return (<AntdSelect   options={[{value:'0',label:'初始报价'},{value:'1',label:'执行中'},{value:'2',label:'已完成'}]} {...props}/>);
};

export const Note = (props) => {
  return (<TextArea    {...props} />);
};
