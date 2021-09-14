/**
 * 销售字段配置页
 *
 * @author
 * @Date 2021-08-02 15:47:16
 */

import React from 'react';
import {Input} from 'antd';
import TextArea from 'antd/es/input/TextArea';

export const Name = (props) =>{
  return (<Input {...props}/>);
};

export const Note = (props) =>{
  return (<TextArea {...props}/>);
};
