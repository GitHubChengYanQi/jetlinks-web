/**
 * 盘点任务主表字段配置页
 *
 * @author Captain_Jazz
 * @Date 2021-12-27 09:27:27
 */

import React from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../inventoryUrl';
import Coding from '@/pages/Erp/tool/components/Coding';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';

export const InventoryTaskName = (props) =>{
  return (<Input {...props}/>);
};
export const Remark = (props) =>{
  return (<Input.TextArea {...props}/>);
};
export const Display = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};
export const CreateTime = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateTime = (props) =>{
  return (<Input {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input {...props}/>);
};


export const UserId = (props) =>{
  return (<Select api={UserIdSelect} {...props}/>);
};

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};

