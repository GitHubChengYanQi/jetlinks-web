/**
 * 采购报价表单字段配置页
 *
 * @author Captain_Jazz
 * @Date 2021-12-22 11:17:27
 */

import React from 'react';
import {Input,InputNumber,Select as AntdSelect,Checkbox} from 'antd';
import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import {taxRateListSelect} from '@/pages/Purshase/taxRate/taxRateUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';

export const SkuId = (props) =>{
  const {options,...other} = props;
  return (<AntdSelect options={options || []} {...other} style={{width:200}} dropdownMatchSelectWidth={500} />);
};
export const SkuListSelect = (props) =>{
  return (<SelectSku {...props} />);
};
export const Price = (props) =>{
  return (<InputNumber min={1} {...props}/>);
};
export const AllPrice = (props) =>{
  const {value} = props;
  return (<div style={{width:90,textAlign:'center'}}>{value || 0}</div>);
};
export const TaxPrice = (props) =>{
  return (<InputNumber min={1} {...props}/>);
};
export const AllPreTax = (props) =>{
  const {value} = props;
  return (<div style={{width:90,textAlign:'center'}}>{value || 0}</div>);
};
export const AllAfterTax = (props) =>{
  const {value} = props;
  return (<div style={{width:90,textAlign:'center'}}>{value || 0}</div>);
};
export const CustomerId = (props) =>{
  return (<Input {...props}/>);
};
export const InvoiceType = (props) =>{
  return (<AntdSelect options={[{label:'票据类型1',value:'票据类型1'}]} style={{width:120}} {...props}/>);
};
export const PaymentMethod = (props) =>{
  return (<AntdSelect options={[{label:'付款1',value:'付款1'}]} style={{width:120}} {...props}/>);
};
export const PeriodOfValidity = (props) =>{
  return (<DatePicker width={120} {...props}/>);
};
export const Total = (props) =>{
  return (<InputNumber min={1} {...props}/>);
};
export const IsTax = (props) =>{
  return (<Input {...props}/>);
};
export const PreTax = (props) =>{
  return (<InputNumber {...props}/>);
};
export const Freight = (props) =>{
  return (<Input {...props}/>);
};
export const AfterTax = (props) =>{
  return (<InputNumber {...props}/>);
};
export const IsFreight = (props) =>{
  return (<Checkbox {...props} checked={props.value}/>);
};
export const Source = (props) =>{
  return (<Input {...props}/>);
};
export const SourceId = (props) =>{
  return (<Input {...props}/>);
};
export const FornId = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};

export const DeliveryDate = (props) =>{
  return (<DatePicker width={120}  {...props}/>);
};

export const TaxRateId = (props) =>{
  return (<Select api={taxRateListSelect} width={120} {...props}/>);
};