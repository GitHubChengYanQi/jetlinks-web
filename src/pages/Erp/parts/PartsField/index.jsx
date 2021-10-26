/**
 * 清单字段配置页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef, useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Select from '@/components/Select';
import Modal2 from '@/components/Modal';
import Search from 'antd/es/input/Search';
import ItemsList from '@/pages/Erp/items/ItemsList';
import * as apiUrl from '../PartsUrl';
import {spuListSelect} from '../PartsUrl';
import Modal from '@/components/Modal';
import Attribute from '@/pages/Erp/parts/components/Attribute';
import SpuAttribute from '@/pages/Erp/parts/components/SpuAttribute';


const w = 200;

export const ItemId = (props) => {
  return (<Select api={apiUrl.itemIdSelect} {...props} />);
};
export const BrandId = (props) => {
  return (<Select api={apiUrl.brandIdSelect} {...props} />);
};

export const Item = (props) => {
  return (<Select api={apiUrl.ProductNameListSelect} Select {...props} />);
};

export const Name = (props) => {
  return (<Input.TextArea   {...props} />);
};

export const SpuId = (props) => {

  const {spuId, onChange, select, ...other} = props;

  useEffect(() => {
    if (props.value) {
      typeof spuId === 'function' && spuId(props.value);
    }
  }, []);

  return (<Select api={apiUrl.spuListSelect} onChange={(value) => {
    typeof spuId === 'function' && spuId(value);
    onChange(value);
    typeof select === 'function' && select(value);
  }} {...other} />);
};


export const Remake = (props) => {

  const {attribute, select,...other} = props;

  const attributes = typeof attribute === 'string' && JSON.parse(attribute);

  return (<SpuAttribute attribute={attributes} select={select} {...other} />);
};

export const Number = (props) => {
  return (<InputNumber min={0}   {...props} />);
};

export const PartName = (props) => {
  return (<Input {...props} />);
};

export const brandName = (props) => {
  return (<Input   {...props} />);
};

export const Spu = (props) => {
  return (<Input   {...props} />);
};
