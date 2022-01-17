/**
 * 询价任务字段配置页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React from 'react';
import {Input, Radio} from 'antd';
import Coding from '@/pages/Erp/tool/components/Coding';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Select from '@/components/Select';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';
import {customerLevelIdSelect} from '@/pages/Crm/customer/crmCustomerLevel/crmCustomerLevelUrl';
import DatePicker from '@/components/DatePicker';


export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};

export const SkuId = (props) => {
  return (<SkuResultSkuJsons skuResult={props.value} />);
};

export const Remark = (props) => {
  return (<Input.TextArea {...props} />);
};

export const Number = (props) => {
  return (<>{props.value}</>);
};

export const InquiryTaskName = (props) =>{
  return (<Input {...props}/>);
};
export const UserId = (props) =>{
  return (<Select api={UserIdSelect} width={200} {...props}/>);
};
export const Deadline = (props) =>{
  return (<DatePicker {...props}/>);
};
export const SupplierLevel = (props) =>{
  return (<Select api={customerLevelIdSelect} {...props}/>);
};
export const IsSupplier = (props) =>{
  return (<Radio.Group {...props}><Radio value='1'>是</Radio><Radio value='0'>否</Radio></Radio.Group>);
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
