/**
 * 质检表字段配置页
 *
 * @author song
 * @Date 2021-10-27 13:08:57
 */

import React, {useRef, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button, Space} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../qualityCheckUrl';
import Editor from '@/components/Editor';
import Selects from '@/pages/Crm/data/components/Selects';
import {qualityCheckClassificationListSelect, toolListSelect} from '../qualityCheckUrl';
import FileUpload from '@/pages/Crm/data/components/FileUpload';
import Modal from '@/components/Modal';
import QualityCheckClassificationList
  from '@/pages/Erp/qualityCheck/components/qualityCheckClassification/qualityCheckClassificationList';
import {useBoolean} from 'ahooks';

export const Name = (props) => {
  return (<Input {...props} />);
};
export const SimpleName = (props) => {
  return (<Input {...props} />);
};
export const QualityCheckClassificationId = (props) => {

  const ref = useRef();

  const [state,{toggle}] = useBoolean();

  return (
    <Space>
      <Select resh={state} width={200} api={apiUrl.qualityCheckClassificationListSelect} {...props} />
      <Button onClick={()=>{
        ref.current.open(false);
      }}>设置分类</Button>
      <Modal width={800} component={QualityCheckClassificationList} ref={ref} onClose={()=>{
        ref.current.close();
        toggle();
      }} />
    </Space>);
};
export const Tool = (props) => {
  return (<Selects api={apiUrl.toolListSelect} {...props} />);
};
export const Note = (props) => {
  return (<Input.TextArea {...props} />);
};
export const Norm = (props) => {
  return (<Editor {...props} />);
};
export const CreateTime = (props) => {
  return (<Input {...props} />);
};
export const UpdateTime = (props) => {
  return (<Input {...props} />);
};
export const CreateUser = (props) => {
  return (<Input {...props} />);
};
export const UpdateUser = (props) => {
  return (<Input {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};
export const DeptId = (props) => {
  return (<Input {...props} />);
};
export const Attachment = (props) => {
  return (<FileUpload {...props} />);
};
export const Coding = (props) => {
  return (<Input {...props} />);
};
