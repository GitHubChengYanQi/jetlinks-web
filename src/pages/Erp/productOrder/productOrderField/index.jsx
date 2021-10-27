/**
 * 产品订单字段配置页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
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
  Popover,
  Space
} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../productOrderUrl';
import {customerListSelect, spuListSelect} from '../productOrderUrl';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import Modal from '@/components/Modal';
import SkuList from '@/pages/Erp/productOrder/components/SkuList';
import SpuAttribute from '@/pages/Erp/parts/components/SpuAttribute';
import CustomerAll from '@/pages/Crm/contract/components/CustomerAll';
import {useRequest} from '@/util/Request';
import {spuClassificationListSelect, spuDetail} from '@/pages/Erp/spu/spuUrl';
import SelectSpu from '@/pages/Erp/spu/components/SelectSpu';

export const Number = (props) => {
  return (<InputNumber min={0} {...props} />);
};
export const State = (props) => {
  return (<Input min={0} {...props} />);
};
export const Money = (props) => {
  return (<InputNumber min={0} {...props} />);
};

export const Customer = (props) => {
  return (<Select api={apiUrl.customerListSelect} {...props} />);
};
export const CreateTime = (props) => {
  return (<Input {...props} />);
};
export const CreateUser = (props) => {
  return (<Input {...props} />);
};
export const UpdateTime = (props) => {
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

export const SkuId = (props) => {

  const {attribute, select, ...other} = props;
  const attributes = typeof attribute === 'string' && JSON.parse(attribute);
  return (<SpuAttribute attribute={attributes} select={select} {...other} />);
};

export const SpuId = (props) => {


  const {data, onChange, select, ...other} = props;

  const {run} = useRequest(spuDetail, {
    manual: true,
    onSuccess:(res)=>{
      if (res.attribute) {
        const attribute = JSON.parse(res.attribute);
        if (attribute){
          typeof data === 'function' && data(attribute);
        }
      }
    }
  });

  return (<SelectSpu
    select={(value) => {
      typeof select === 'function' && select(value);
    }}
    onChange={async (value) => {
      await run({
        data: {
          spuId: value
        }
      });
      onChange(value);
    }}
    {...other} />);
};
