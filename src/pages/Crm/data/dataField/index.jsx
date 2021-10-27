/**
 * 资料字段配置页
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React, {useEffect, useState} from 'react';
import {
  Input,
  Select as AntSelect, Space, Upload, Button, message
} from 'antd';
import {useRequest} from '@/util/Request';
import {UploadOutlined} from '@ant-design/icons';
import {dataClassificationSelect, itemIdSelect} from '../dataUrl';
import Select from '@/components/Select';
import Editor from '@/components/Editor';
import FileUpload from '@/pages/Crm/data/components/FileUpload';
import Selects from '@/pages/Crm/data/components/Selects';

export const Content = (props) => {
  return (<Editor {...props} />);
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
