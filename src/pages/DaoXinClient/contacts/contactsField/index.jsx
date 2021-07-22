/**
 * 联系人表字段配置页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

import React from 'react';
import {Input,Select as AntdSelect} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../contactsUrl';
// eslint-disable-next-line import/named
import {clientListSelect, nameListSelect, phoneListSelect} from '../contactsUrl';



export const ContactsId = (props) =>{
  return (<Input {...props}/>);
//  return (<Select api={apiUrl.contactsIdListSelect}{...props}/>);
};
export const Name = (props) =>{
   return(<Input {...props}/>);
 // return (<Select api={apiUrl.nameListSelect} {...props}/>);
};
export const Job = (props) =>{
//  return(<Input {...props}/>);
  return (<Input {...props}/>



  );
};
