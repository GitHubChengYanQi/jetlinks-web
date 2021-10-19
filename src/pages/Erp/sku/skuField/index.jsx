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

const {Column} = Table;

export const SkuName = (props) => {
  return (<Input {...props} />);
};
export const SpuId = (props) => {
  return (<Input {...props} />);
};

export const Attributes = (props) => {

  return (<Input {...props} />);
};
export const Values = (props) => {

  const {items,...other} = props;

  return (
    <Radio.Group {...other} defaultValue={items.length && items[0].attributeValuesId}>
      {items && items.map((items,index)=>{
        return  <Radio key={index} value={items.attributeValuesId}>{items.attributeValues}</Radio>;
      })}
    </Radio.Group>
  );
};
