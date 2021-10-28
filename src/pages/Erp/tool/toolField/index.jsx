/**
 * 工具表字段配置页
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {useEffect, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Space} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../toolUrl';
import FileUpload from '@/pages/Crm/data/components/FileUpload';
import Editor from '@/components/Editor';
import {
  codingRulesDetail,
  codingRulesList,
  codingRulesListSelect,
  toolClassificationListSelect,
  unitListSelect
} from '../toolUrl';
import {useRequest} from '@/util/Request';
import Coding from '@/pages/Erp/tool/components/Coding';

export const Name = (props) => {
  return (<Input {...props} />);
};

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId} {...other} />);
};
export const State = (props) => {
  return (<>
    <Radio.Group {...props}>
      <Radio value={0}>启用</Radio>
      <Radio value={1}>停用</Radio>
    </Radio.Group>
  </>);
};
export const Note = (props) => {
  return (<Input.TextArea {...props} />);
};
export const Attachment = (props) => {
  return (<FileUpload {...props} />);
};
export const UnitId = (props) => {
  return (<Select api={apiUrl.unitListSelect} {...props} />);
};
export const ToolClassificationId = (props) => {
  return (<Select api={apiUrl.toolClassificationListSelect} {...props} />);
};
export const CreateUser = (props) => {
  return (<Input {...props} />);
};
export const UpdateUser = (props) => {
  return (<Input {...props} />);
};
export const CreateTime = (props) => {
  return (<Input {...props} />);
};
export const UpdateTime = (props) => {
  return (<Input {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};
export const DeptId = (props) => {
  return (<Input {...props} />);
};

export const Tool = (props) => {
  return (<Editor {...props} />);
};
