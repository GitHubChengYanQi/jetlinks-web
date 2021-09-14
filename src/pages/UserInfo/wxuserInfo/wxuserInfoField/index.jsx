/**
 * 用户小程序关联字段配置页
 *
 * @author cheng
 * @Date 2021-09-14 08:37:48
 */

import React from 'react';
import {Input} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '../wxuserInfoUrl';

export const UserId = (props) =>{
  return (<Select api={apiUrl.UserIdSelect} {...props}/>);
};
export const Uuid = (props) =>{
  return (<Input {...props}/>);
};
export const MemberId = (props) =>{
  return (<Select api={apiUrl.MemberId} {...props}/>);
};
