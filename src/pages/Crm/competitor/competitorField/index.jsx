/**
 * 字段配置页
 *
 * @author
 * @Date 2021-09-07 09:50:09
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../competitorUrl';

export const CompetitorsQuoteId = (props) =>{
  return (<Input {...props}/>);
};
export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const Phone = (props) =>{
  return (<Input {...props}/>);
};
export const Url = (props) =>{
  return (<Input {...props}/>);
};
export const CreationDate = (props) =>{
  return (<Input {...props}/>);
};
export const Email = (props) =>{
  return (<Input {...props}/>);
};
export const StaffSize = (props) =>{
  return (<Input {...props}/>);
};
export const Ownership = (props) =>{
  return (<Input {...props}/>);
};
export const Region = (props) =>{
  return (<Input {...props}/>);
};
export const CompetitionLevel = (props) =>{
  return (<Input {...props}/>);
};
export const AnnualSales = (props) =>{
  return (<Input {...props}/>);
};
export const CompanyProfile = (props) =>{
  return (<Input.TextArea {...props}/>);
};
export const RivalAdvantage = (props) =>{
  return (<Input.TextArea {...props}/>);
};
export const OpponentsWeaknesses = (props) =>{
  return (<Input.TextArea {...props}/>);
};
export const TakeCountermeasures = (props) =>{
  return (<Input.TextArea {...props}/>);
};
