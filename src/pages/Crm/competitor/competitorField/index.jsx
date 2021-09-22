/**
 * 字段配置页
 *
 * @author
 * @Date 2021-09-07 09:50:09
 */

import React, {useEffect, useRef} from 'react';
import {Input, InputNumber, TimePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import DatePicker from '@/components/DatePicker';
import Cascader from '@/components/Cascader';
import * as apiUrl from '../competitorUrl';
import Select from '@/components/Select';
import {useRequest} from '@/util/Request';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import CompetitorEdit from '@/pages/Crm/competitor/competitorEdit';
import BusinessEdit from '@/pages/Crm/business/BusinessEdit';

export const CompetitorsQuoteId = (props) =>{
  return (<Input {...props}/>);
};
export const Name = (props) =>{
  return (<Input disabled={props.dis} {...props}/>);
};
export const Phone = (props) =>{
  return (<Input style={{width:290}} {...props}/>);
};
export const Url = (props) =>{
  return (<Input {...props}/>);
};
export const CreationDate = (props) =>{
  return (<DatePicker {...props}/>);
};
export const Email = (props) =>{
  return (<Input {...props}/>);
};
export const StaffSize = (props) =>{
  return (<InputNumber min={0} {...props}/>);
};
export const Ownership = (props) =>{
  return (<AntdSelect options={[{label:'有限责任公司',value:0},{label:'个人独资企业',value:1},{label:'合伙企业',value:2},{label:'全民所有制企业',value:3},{label:'农民专业合作社',value:4}]} {...props}/>);
};
export const Region = (props) =>{
  return (<Cascader api={apiUrl.commonArea} {...props}/>);
};
export const CompetitionLevel = (props) =>{
  return (<AntdSelect options={[{label:'低',value:1},{label:'中',value:2},{label:'高',value:3}]} {...props}/>);
};
export const AnnualSales = (props) =>{
  return (<InputNumber step={10000} min={0} {...props}/>);
};
export const CompanyProfile = (props) =>{
  return (<Input.TextArea style={{width:'100%'}} showCount maxLength={100} {...props}/>);
};
export const RivalAdvantage = (props) =>{
  return (<Input.TextArea style={{width:'100%'}} showCount maxLength={100} {...props}/>);
};
export const OpponentsWeaknesses = (props) =>{
  return (<Input.TextArea style={{width:'100%'}} showCount maxLength={100} {...props}/>);
};
export const TakeCountermeasures = (props) =>{
  return (<Input.TextArea style={{width:'100%'}} showCount maxLength={100} {...props}/>);
};
export const BusinessId = (props) =>{
  return (<Select api={apiUrl.BusinessId} {...props} />);
};
