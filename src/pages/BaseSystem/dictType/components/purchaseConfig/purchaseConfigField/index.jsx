/**
 * 采购配置表字段配置页
 *
 * @author
 * @Date 2021-12-21 13:39:47
 */

import React from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Spin} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../purchaseConfigUrl';
import {customerLevelIdSelect} from '@/pages/Crm/customer/crmCustomerLevel/crmCustomerLevelUrl';
import {useRequest} from '@/util/Request';
import {purchaseConfigList} from '../purchaseConfigUrl';

export const Type = (props) => {

  const {loading, data} = useRequest(purchaseConfigList);

  if (loading) {
    return <Spin />;
  }
  const disabled = (value) => {
    return data && data.filter((items) => {
      return items.type === value;
    }).length > 0;
  };
  return (<Radio.Group {...props}>
    <Radio value="level" disabled={disabled('level')}>最低级别</Radio>
    <Radio value="supply" disabled={disabled('supply')}>非供应商报价</Radio>
  </Radio.Group>);
};
export const Value = (props) => {
  const {type, ...other} = props;

  const jsonValue = () => {
    try {
      return JSON.parse(other.value).value;
    } catch (e) {
      other.onChange(null);
      return null;
    }
  };

  switch (type) {
    case 'level':
      return <Select
        value={
          other.value && typeof other.value === 'object' ? other.value.value : jsonValue()
        }
        api={customerLevelIdSelect}
        onChange={(value, option) => {
          other.onChange(option);
        }} />;
    case 'supply':
      return <Radio.Group {...other}><Radio value="是">是</Radio><Radio value="否">否</Radio></Radio.Group>;
    default:
      break;
  }
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
