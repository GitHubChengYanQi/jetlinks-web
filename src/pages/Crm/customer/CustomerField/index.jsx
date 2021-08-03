/**
 * 客户管理表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useState} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio} from 'antd';
import Select from '@/components/Select';
import {DatePicker2} from '@alifd/next';
import * as apiUrl from '@/pages/Crm/customer/CustomerUrl';
import TreeSelect from '@/components/TreeSelect';
import {useRequest} from '@/util/Request';

const {Option} = Select;

const w = 250;

export const Name = (props) => {
  return (<Input style={{width: w}} {...props} />);
};
export const ClientName = (props) => {

  const [value, setValue] = useState(' ');

  const {data, run} = useRequest({url: '/customer/list', method: 'POST', data: {customerName: value}}, {
    debounceInterval: 300,
  });

  const handleSearch = async value => {
    if (value) {
      setValue(value);
      await run();
    }
  };

  const da = data ? data.map((values) => {
    return {
      label: values.customerName,
      value: values.customerId,
    };
  }) : [];

  const handleChange = (values) => {
    props.onSuccess(values);
    setValue(values);
  };


  return ((
    <Select values={value} handleSearch={(value) => handleSearch(value)} handleChange={(value) => handleChange(value)}data={da} {...props} />));
};

export const ContactsId = (props) => {
  return (<InputNumber style={{width: w}} {...props} />);
};

export const Setup = (props) => {
  return (<DatePicker2 style={{width: w}} showTime {...props} />);
};
export const Legal = (props) => {
  return (<Input style={{width: w}} {...props} />);
};
export const Utscc = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};
export const CompanyType = (props) => {
  return (<AntdSelect
    showSearch
    style={{width: w}}
    filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    options={[{value: '有限责任公司（自然人独资）', label: '有限责任公司（自然人独资）'}, {value: '股份有限公司', label: '股份有限公司'}, {
      value: '有限合伙企业',
      label: '有限合伙企业'
    }, {value: '外商独资企业', label: '外商独资企业'}, {value: '个人独资企业', label: '个人独资企业'}, {
      value: '国有独资公司',
      label: '国有独资公司'
    }, {value: '其他类型', label: '其他类型'}]} {...props} />);
};
export const BusinessTerm = (props) => {
  return (<DatePicker2 showTime style={{width: w}}  {...props} />);
};
export const SignIn = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};
export const Introduction = (props) => {
  return (<Input.TextArea style={{width: w}}  {...props} />);
};

export const Latitude = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};
export const DeptId = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};
export const ClientId = (props) => {
  return (<Select width={w} api={apiUrl.customerIdSelect} {...props} />);
};

export const client = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};

export const Job = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};

export const Dept = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};
export const Client = (props) => {
  return (<Select width={w} api={apiUrl.customerIdSelect} {...props} />);
};

export const Status = (props) => {
  return (
    <Radio.Group {...props} >
      <Radio value={0}>潜在客户</Radio>
      <Radio value={1}>正式客户</Radio>
    </Radio.Group>
  );
};

export const Classification = (props) => {
  return (
    <Radio.Group {...props}>
      <Radio value={0} defaultChecked checked>代理商</Radio>
      <Radio value={1}>终端用户</Radio>
    </Radio.Group>
  );
};

export const Note = (props) => {
  return (<Input.TextArea style={{width: w}}  {...props} />);
};

export const CustomerLevelId = (props) => {
  return (<Select width={w} api={apiUrl.CustomerLevelIdSelect}  {...props} />);
};

export const OriginId = (props) => {
  return (<Select width={w} api={apiUrl.OriginIdSelect}  {...props} />);
};

export const UserName = (props) => {
  return (<Select width={w} api={apiUrl.UserIdSelect}  {...props} />);
};

export const Emall = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};

export const Url = (props) => {
  return (<Input style={{width: w}}  {...props} />);
};


export const IndustryOne = (props) => {
  return (<TreeSelect api={apiUrl.crmIndustryTreeView} style={{width: w}} {...props} />);
};


