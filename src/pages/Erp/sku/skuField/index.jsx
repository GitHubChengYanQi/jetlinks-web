/**
 * sku表字段配置页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Table} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../skuUrl';
import {useRequest} from '@/util/Request';
import {itemAttributeList} from '@/pages/Erp/itemAttribute/itemAttributeUrl';
import {attributeValuesList} from '@/pages/Erp/attributeValues/attributeValuesUrl';
import {spuListSelect} from '@/pages/Erp/parts/PartsUrl';

export const SkuName = (props) => {
  const {disabled,...other} = props;
  return (<Input disabled={disabled} {...other} />);
};
export const SpuId = (props) => {
  return (<Select api={spuListSelect} {...props} />);
};

export const Attributes = (props) => {

  return (<Input {...props} />);
};
