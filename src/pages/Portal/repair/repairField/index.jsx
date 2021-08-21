/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React from 'react';
import UpLoadImg from '@/components/Upload';
import {Input,Select as AntSelect} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../repairUrl';
import DatePicker from '@/components/DatePicker';

export const CompanyId = (props) =>{
  return (<Select api={apiUrl.companyIdSelect} {...props}/>);
};
export const ItemImgUrl = (props) =>{
  return (<UpLoadImg {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select api={apiUrl.itemIdSelect} {...props}/>);
};
export const ServiceType = (props) =>{
  return (<AntSelect options={[{label:'设备项修',value:'设备项修' }]} {...props}/>);
};
export const ExpectTime = (props) =>{
  return (<DatePicker {...props}/>);
};
export const Comment = (props) =>{
  return (<Input.TextArea {...props}/>);
};

export const Money = (props) =>{
  return (<Input {...props}/>);
};
export const QualityType = (props) =>{
  return (<AntSelect options={[{label:'质保内',value:'质保内'},{label:'质保外',value:'质保外'}]}  {...props}/>);
};
export const ContractType = (props) =>{
  return (<AntSelect options={[{label:'合同内',value:'合同内'},{label:'合同外',value:'合同外'}]} {...props}/>);
};
