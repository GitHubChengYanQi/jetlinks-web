/**
 * 合同表字段配置页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useState} from 'react';
import {Input,InputNumber,TimePicker,DatePicker,Select as AntdSelect,Checkbox,Radio} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../ContractUrl';
import parse from 'html-react-parser';
import {DatePicker2} from '@alifd/next';

const w = 200;

export const Name = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const UserId = (props) =>{
  return (<Select style={{width:w}}  api={apiUrl.userIdSelect} {...props}/>);
};
export const Note = (props) =>{
  return (<Input  style={{width:w}} {...props}/>);
};
export const Time = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};
export const Content = (props) =>{

  const [state,setState] = useState();

  const handelChange = (e) => {
    setState(e.target.value);
  };



  return(
    <>
      {
        parse(props.value)
      }

    </>
  );
}
