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

  const {value} = props;

  const itemIds = [];

  if (value && value.length > 0) {
    if (typeof value[0] === 'object') {
      value.forEach((items) => {
        itemIds.push(items && `${items.itemId}`);
      });
    } else {
      value.forEach((items) => {
        itemIds.push(items);
      });
    }
  }


  useEffect(() => {
    if (value) {
      props.onChange(itemIds);
    }
  }, []);


  const {data} = useRequest(itemIdSelect);

  const options = data || [];

  return (
    <AntSelect
      mode="multiple"
      showArrow
      style={{width: '100%'}}
      options={options}
      value={itemIds}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
};

export const DataClassificationId = (props) => {
  return (<Select api={dataClassificationSelect} {...props} />);
};
