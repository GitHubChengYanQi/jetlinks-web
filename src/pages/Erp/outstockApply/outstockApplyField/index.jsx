/**
 * 出库申请字段配置页
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React, {useEffect} from 'react';
import {
  Input,
  InputNumber,
  TimePicker,
  DatePicker,
  Select as AntdSelect,
  Checkbox,
  Radio,
  Select as AntSelect
} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../outstockApplyUrl';
import {UserIdSelect} from '../outstockApplyUrl';
import SelectAddCustomer from '@/pages/Crm/customer/components/SelectAddCustomer';

export const ApplyState = (props) =>{
  return (<Input {...props}/>);
};
export const BrandId = (props) =>{
  return (<Select width={150} api={apiUrl.Brands} {...props}/>);
};
export const ItemId = (props) =>{
  return (<Select width={150} api={apiUrl.Items} {...props}/>);
};
export const UserId = (props) =>{
  return (<Select api={apiUrl.UserIdSelect} {...props}/>);
};

export const Number = (props) =>{
  return (<InputNumber {...props}/>);
};





export const Customer = (props) => {
  const {customerid, onChange} = props;
  return (<>
    <SelectAddCustomer {...props} onChange={(value) => {
      onChange(value);
      customerid(value);
    }} />
  </>);
};

export const Contacts = (props) => {
  const {customerid, contactsid, onChange,state} = props;

  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [customerid || null]);
  }

  const data = customerid ? customerid.map((value, index) => {
    return {
      label: value.contactsName,
      value: value.contactsId,
    };
  }) : null;


  return (<>
    <AntSelect style={{width: 200}} options={data}  {...props} onChange={(value) => {
      onChange(value);
      contactsid ? contactsid(value) : null;
    }} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} />
  </>);
};
export const Phone = (props) => {
  const {contactsid,state} = props;
  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [contactsid || null]);
  }
  const data = contactsid ? contactsid.map((value) => {
    return {
      label: value.phoneNumber,
      value: value.phoneId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width: 200}} options={data} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} {...props} />
  </>);
};
export const Adress = (props) => {
  const {customerid,state} = props;
  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [customerid || null]);
  }
  const data = customerid ? customerid.map((value) => {
    return {
      label: value.location,
      value: value.adressId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width: 200}} options={data} {...props} showSearch filterOption={(input, option) =>option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} />
  </>);
};
