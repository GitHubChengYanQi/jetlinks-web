/**
 * 出库单字段配置页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React from 'react';
import {Input} from 'antd';
import DatePicker from '@/components/DatePicker';

export const State = (props) =>{
  return (<Input {...props}/>);
};
export const Time = (props) =>{
  return (<DatePicker {...props}/>);
};
