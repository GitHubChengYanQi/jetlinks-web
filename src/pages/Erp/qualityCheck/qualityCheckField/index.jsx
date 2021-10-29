/**
 * 质检表字段配置页
 *
 * @author song
 * @Date 2021-10-27 13:08:57
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Input,
  InputNumber,
  TimePicker,
  DatePicker,
  Select as AntdSelect,
  Checkbox,
  Radio,
  Button,
  Space,
  Select as AntSelect
} from 'antd';
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
import {useRequest} from '@/util/Request';

export const Name = (props) => {
  return (<Input {...props} />);
};
export const SimpleName = (props) => {
  return (<Input {...props} />);
};
export const QualityCheckClassificationId = (props) => {

  const ref = useRef();

  const [state, {toggle}] = useBoolean();

  return (
    <Space>
      <Select resh={state} width={200} api={apiUrl.qualityCheckClassificationListSelect} {...props} />
      <Button onClick={() => {
        ref.current.open(false);
      }}>设置分类</Button>
      <Modal width={800} component={QualityCheckClassificationList} ref={ref} onClose={() => {
        ref.current.close();
        toggle();
      }} />
    </Space>);
};
export const Tool = (props) => {

  const {value,onChange} = props;

  const array = [];

  if (value && value.length > 0) {
    if (typeof value[0] === 'object') {
      value.forEach((items) => {
        array.push(items && `${items.toolId}`);
      });
    } else {
      value.forEach((items) => {
        array.push(items);
      });
    }
  }


  useEffect(() => {
    if (value) {
      onChange(array);
    }
  }, []);


  const {data} = useRequest(toolListSelect);

  const options = data || [];

  return (
    <AntSelect
      mode="multiple"
      showArrow
      style={{width: '100%'}}
      options={options}
      value={array}
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
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

export const Type = (props) => {
  return (<>
    <Radio.Group {...props}>
      <Radio value={1}>数值</Radio>
      <Radio value={2}>文本</Radio>
      <Radio value={3}>是否</Radio>
      <Radio value={4}>图片</Radio>
      <Radio value={5}>百分比</Radio>
      <Radio value={6}>视频</Radio>
      <Radio value={7}>附件</Radio>
    </Radio.Group>
  </>);
};
