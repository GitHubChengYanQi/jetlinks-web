/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useState} from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import {DatePicker2} from '@alifd/next';
import Editor from '@/components/Editor';
import TextArea from 'antd/es/input/TextArea';







export const Content = (props) =>{
  const [data,setData] = useState(props.value);

  const input = "<input type='text' {...props}>";
  const number = "<input type='number'  {...props}/>";
  const date = "<input type='date'  {...props}/>";
  const select = "<select  {...props}><option value='123'>123</option><option value='456'>456</option></select>";

  return (
    <>
      <div dangerouslySetInnerHTML={{__html:data.replaceAll("$(input)",input).replaceAll("$(date)",date).replaceAll("$(select)",select).replaceAll("$(number)",number) }} />
    </>
  );
};















export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const time = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const remake = (props) =>{
  return (<Input {...props}/>);
};

export const PurchaseUnitId = (props) =>{
  return (<Input className='biginput' {...props}/>);
};
export const SupplyUnitId = (props) =>{
  return (<Input className='biginput'   {...props}/>);
};
export const Equipment = (props) =>{
  return (<Input  className='input' {...props}/>);
};
export const ProjectName = (props) =>{
  return (<Input  className='input' {...props}/>);
};
export const ContractAmount = (props) =>{
  return (<InputNumber  className='input' {...props}/>);
};
export const Payment = (props) =>{
  return (<AntdSelect className='input'  options={[{value:'分期付款',label:'分期付款'},{value:'全额付款',label:'全额付款'}]} {...props}/>);
};
export const EffectiveDate = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const AmountOne = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const AmountTwo = (props) =>{
  return (<InputNumber  className='input' {...props}/>);
};
export const RunDate = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const AmountThree = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const PaceDelivery = (props) =>{
  return (<Input className='input'  {...props}/>);
};
export const DelivererName = (props) =>{
  return (<Input  className='input'  {...props}/>);
};
export const DeliveryAddress = (props) =>{
  return (<Input  className='input' {...props}/>);
};
export const TransportationMode = (props) =>{
  return (<AntdSelect  className='input' options={[{value:'水路运输',label:'水路运输'},{value:'陆路运输',label:'陆路运输'},{value:'空中运输',label:'空中运输'}]} {...props}/>);
};
export const InstallationLocation = (props) =>{
  return (<Input  className='input' {...props}/>);
};
export const AcceptanceTimeOne = (props) =>{
  return (<InputNumber  className='input' {...props}/>);
};
export const AcceptanceTimeTwo = (props) =>{
  return (<InputNumber  className='input' {...props}/>);
};
export const AcceptanceTimeThree = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const ReceiveLocation = (props) =>{
  return (<Input className='input'  {...props}/>);
};
export const ChargeStandard = (props) =>{
  return (<Input  className='input' {...props}/>);
};
export const WarrantyPeriodOne = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const WarrantyPeriodTwo = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const WarrantyPeriodThree = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const WarrantyPeriodFour = (props) =>{
  return (<InputNumber className='input'  {...props}/>);
};
export const WarrantyPeriodFive = (props) =>{
  return (<InputNumber  className='input' {...props}/>);
};
export const PartyAName = (props) =>{
  return (<Input className='input'  {...props}/>);
};
export const PartyATime = (props) =>{
  return (<DatePicker2 {...props}/>);
};
export const PartyBName = (props) =>{
  return (<Input className='input'  {...props}/>);
};
export const PartyBTime = (props) =>{
  return (<DatePicker2 {...props}/>);
};
