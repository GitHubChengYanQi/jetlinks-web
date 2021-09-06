/**
 * 派工表字段配置页
 *
 * @author n
 * @Date 2021-08-23 10:25:48
 */

import React from 'react';
import {Input} from 'antd';
import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import {UserIdSelect} from '@/pages/Portal/dispatching/dispatchingUrl';
import Cascader from '@/components/Cascader';
import {commonArea} from '@/pages/Portal/repair/repairUrl';

export const Name = (props) =>{
  return (<Select width='100%' api={UserIdSelect} placeholder='请输入工程师姓名' {...props}/>);
};
export const Phone = (props) =>{
  return (<Input  placeholder='请输入工程师手机号' {...props}/>);
};
export const Time = (props) =>{
  return (<DatePicker  width='100%' placeholder='请选择预计到达时间' {...props}/>);
};
export const Address = (props) =>{
  // return (<Cascader api={commonArea} {...props} placeholder="请选择地区" />);
  return (<Input />);
};
export const State = (props) =>{
  return (<Input {...props}/>);
};
export const Note = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<Input {...props}/>);
};
export const Evaluation = (props) =>{
  return (<Input {...props}/>);
};
export const RepairId = (props) =>{
  props.onChange(props.val || null);
  return (<Input {...props}/>);
};
export const Repair = (props) =>{
  props.onChange(props.val || null);
  return (<Input {...props}/>);
};
export const Repairid = (props) =>{
  return (<Input {...props}/>);
};
export const Type = (props) =>{
  props.onChange(1);
  return (<Input {...props}/>);
};
