/**
 * 工具表字段配置页
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {useRef} from 'react';
import {Input, Radio, Space, Button} from 'antd';
import {useBoolean} from 'ahooks';
import Select from '@/components/Select';
import * as apiUrl from '../toolUrl';
import FileUpload from '@/pages/Crm/data/components/FileUpload';
import Coding from '@/pages/Erp/tool/components/Coding';
import Modal from '@/components/Modal';
import ToolClassificationList from '@/pages/Erp/tool/components/toolClassification/toolClassificationList';
import Editor from '@/components/Editor';

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

  const ref = useRef();

  const [state, {toggle}] = useBoolean();

  return (
    <Space>
      <Select resh={state} width={200} api={apiUrl.toolClassificationListSelect} {...props} />
      <Button onClick={() => {
        ref.current.open(false);
      }}>设置分类</Button>
      <Modal width={800} component={ToolClassificationList} ref={ref} onClose={() => {
        ref.current.close();
        toggle();
      }} />
    </Space>);
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
