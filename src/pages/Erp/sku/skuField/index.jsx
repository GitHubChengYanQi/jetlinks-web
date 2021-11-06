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
import {
  spuClassificationDetail,
  spuClassificationTreeVrew
} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';
import {codingRulesBackCoding} from '@/pages/BaseSystem/codingRules/codingRulesUrl';
import Coding from '@/pages/Erp/tool/components/Coding';

export const Type = (props) => {

  return (<InputNumber {...props} />);
};

export const Specifications = (props) => {
  const {skuId, ...other} = props;
  return (<Input disabled={skuId} {...other} />);
};
export const SkuName = (props) => {
  const {model, onChange, skuname, ...other} = props;

  return (
    <>
      <Input {...other} onChange={(value) => {
        onChange(value.target.value);
        typeof model === 'function' && model(value.target.value);
      }} />
      {skuname}
    </>);
};

export const SelectSpu = (props) => {

  return (<Select api={spuListSelect} {...props} />);
};

export const SpuId = (props) => {

  const {data, run} = useRequest(spuListSelect, {
    defaultParams: {
      data: {
        type: 0,
      }
    }
  });
  useEffect(() => {
    run(
      {
        data: {
          type: 0,
          spuClassificationId: props.classId,
        }
      }
    );
  }, [props.classId]);


  const options = data && data.map((items) => {
    return {
      label: items.label,
      value: items.label,
      id: items.value,
    };
  });

  return (
    <AutoComplete
      value={props.value && props.value.name ? props.value.name : null}
      options={options || []}
      disabled={props.skuId}
      style={{width: 300}}
      onSelect={(value, option) => {
        typeof props.model === 'function' && props.model(value);
        props.onChange({name: value, spuId: option.id});
      }}
      onChange={async (value) => {
        typeof props.model === 'function' && props.model(value);
        props.onChange({name: value});
        await run(
          {
            data: {
              name: value,
              type: 0,
              spuClassificationId: props.classId,
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


export const ClassCode = (props) => {
  return (<Input {...props} />);
};

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId} {...other} />);
};

export const Standard = (props) => {
  const {skuId, ...other} = props;

  return (<Input disabled={skuId} {...other} />);
};

export const SelectSpuClass = (props) => {
  return (<Cascader api={spuClassificationTreeVrew} {...props} />);
};


export const SpuClass = (props) => {

  const {skuId, ...other} = props;

  const ref = useRef();

  const [state, {toggle}] = useBoolean();

  return (
    <Space>
      <Cascader refre={state} disabled={skuId} api={spuClassificationTreeVrew} {...other} />
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

export const State = (props) => {
  return (<Radio.Group {...props}>
    <Radio value={1}>标配</Radio>
    <Radio value={0}>非标配</Radio>
  </Radio.Group>);
};

