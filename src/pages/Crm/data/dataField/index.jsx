/**
 * 资料字段配置页
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React from 'react';
import {
  Input,
} from 'antd';
import {dataClassificationSelect, itemIdSelect} from '../dataUrl';
import Select from '@/components/Select';
import Editor from '@/components/Editor';
import FileUpload from '@/pages/Crm/data/components/FileUpload';
import Selects from '@/pages/Crm/data/components/Selects';

export const Content = (props) => {
  return (<Editor {...props} onChange={(value)=>{
    props.onChange(value && value.replace('img','img mode=\'widthFix\''));
  }}  />);
};

export const Name = (props) => {
  return (<Input {...props} />);
};

export const Attachment = (props) => {

  return (<FileUpload {...props} />);
};
export const ItemIds = (props) => {

  return (<Selects api={itemIdSelect} {...props} />);
};

export const DataClassificationId = (props) => {
  return (<Select api={dataClassificationSelect} {...props} />);
};
