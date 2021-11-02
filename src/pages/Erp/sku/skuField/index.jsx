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
  const {disabled, ...other} = props;
  return (<Input disabled={disabled} {...other} />);
};
export const SpuId = (props) => {

  const {data, run} = useRequest(spuListSelect,{
    defaultParams:{
      data:{
        type:0
      }
    }
  });

  const [name, setName] = useState();

  const {run: spuRun} = useRequest(
    {...spuDetail, data: {spuId: props.value}},
    {
      manual: true,
      onSuccess: (res) => {
        setName(res.name);
      }
    }
  );

  useEffect(() => {
    if (props.value) {
      spuRun(
        {
          data: {
            spuId: props.value
          }
        }
      );
    }
  }, []);

  const options = data && data.map((items, index) => {
    return {
      label: items.label,
      value: items.label,
      id: items.value,
    };
  });

  return (
    <AutoComplete
      defaultValue={name}
      options={options || []}
      style={{width: 200}}
      onSelect={(value, option) => {
        props.onChange({spuId:option.id});
      }}
      onChange={async (value) => {
        props.onChange({spuName:value});
        await run(
          {
            data: {
              name: value,
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

