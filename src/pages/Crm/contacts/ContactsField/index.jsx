/**
 * 联系人表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React from 'react';
import {Input, InputNumber, Select as AntdSelect} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../contactsUrl';
// eslint-disable-next-line import/named
import {clientListSelect, nameListSelect, phoneListSelect} from '../contactsUrl';


const w = 200;

export const client = (props) =>{
  return (<Input  {...props} />);
};
export const ContactsName = (props) =>{
  return (<Input   {...props}/>);
};
export const Job = (props) =>{
  return (<Input   {...props}/>);
};
export const Phone = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const DeptId = (props) =>{
  return (<Input   {...props}/>);
};
export const ClientId = (props) =>{
  return (<Select   api={apiUrl.clientIdSelect} {...props}/>);
};
