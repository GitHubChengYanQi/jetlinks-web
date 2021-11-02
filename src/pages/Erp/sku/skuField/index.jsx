/**
 * sku表字段配置页
 *
 * @author
 * @Date 2021-10-18 14:14:21
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
  Table,
  Space,
  Button, AutoComplete
} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../skuUrl';
import {useRequest} from '@/util/Request';
import {itemAttributeList} from '@/pages/Erp/itemAttribute/itemAttributeUrl';
import {attributeValuesList} from '@/pages/Erp/attributeValues/attributeValuesUrl';
import {spuListSelect} from '@/pages/Erp/parts/PartsUrl';
import {useBoolean} from 'ahooks';
import Modal from '@/components/Modal';
import SpuClassificationList from '@/pages/Erp/spu/components/spuClassification/spuClassificationList';
import {spuClassificationListSelect} from '@/pages/Erp/Spus/spuUrl';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';

export const SkuName = (props) => {
  const {disabled, model, onChange, skuname, ...other} = props;
  return (
    <>
      <Input disabled={disabled} {...other} onChange={(value) => {
        onChange(value.target.value);
        typeof model === 'function' && model(value.target.value);
      }} />
      {skuname}
    </>);
};
export const SpuId = (props) => {

  const {data, run} = useRequest(spuListSelect, {
    defaultParams: {
      data: {
        type: 0,
      }
    }
  });
  useEffect(()=>{
    run(
      {
        data: {
          type: 0,
          spuClassificationId:props.classId,
        }
      }
    );
  },[props.classId]);



  const options = data && data.map((items) => {
    return {
      label: items.label,
      value: items.label,
      id: items.value,
    };
  });

  return (
    <AutoComplete
      defaultValue={props.value && props.value.name}
      options={options || []}
      style={{width: 200}}
      onSelect={(value, option) => {
        typeof props.model === 'function' && props.model(value);
        props.onChange({spuId: option.id});
      }}
      onChange={async (value) => {
        typeof props.model === 'function' && props.model(value);
        props.onChange({name: value});
        await run(
          {
            data: {
              name: value,
              type: 0,
              spuClassificationId:props.classId,
            }
          }
        );
      }}
      placeholder="输入物料名称"
    />
  );
};

export const Attributes = (props) => {
  return (<Input {...props} />);
};

export const SpuClass = (props) => {
  const ref = useRef();

  const [state, {toggle}] = useBoolean();

  return (
    <Space>
      <Select resh={state} width={210} api={spuClassificationListSelect} {...props} />
      <Button onClick={() => {
        ref.current.open(false);
      }}>设置分类</Button>
      <Modal width={800} component={SpuClassificationList} ref={ref} onClose={() => {
        ref.current.close();
        toggle();
      }} />
    </Space>);
};

export const Note = (props) => {
  return (<Input.TextArea {...props} />);
};

