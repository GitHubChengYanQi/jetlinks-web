/**
 * 客户管理表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useState} from 'react';
import {Input, InputNumber, Select as AntdSelect, Radio, Popover} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/customer/CustomerUrl';
import TreeSelect from '@/components/TreeSelect';
import {useRequest} from '@/util/Request';
import DatePicker from '@/components/DatePicker';
import {CompanyRoleIdSelect} from '@/pages/Crm/customer/CustomerUrl';

const {Option} = Select;



export const ContactsName = (props) =>{
  return (<Input  {...props}/>);
};

export const Location = (props) =>{
  return (<Input  {...props}/>);
};
export const Longitude = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const Latitude = (props) =>{
  return (<InputNumber   {...props}/>);
};
export const PhoneNumber = (props) =>{
  return (<InputNumber style={{width:300}}  {...props}/>);
};

export const key = (props) => {
  return <Input {...props} />;
};
export const value = (props) => {
  return <Input {...props} />;
};

export const Name = (props) => {
  return (<Input {...props} />);
};
export const CompanyRoleId = (props) => {
  return (<Select api={apiUrl.CompanyRoleIdSelect} {...props} />);
};
export const CustomerName = (props) => {


  const {value, onChange, method, onSuccess, ...other} = props;

  const [val, setVal] = useState(value);

  const {data, run} = useRequest({url: '/customer/list', method: 'POST'}, {
    debounceInterval: 300,
    manual: true,
  });


  const handleChange = async value => {
    if (value){
      setVal(value);
      onChange(value);
      await run({
        data: {
          customerName: value
        }
      });
    }else {
      setVal(value);
      await run({
        data: {
          customerName: ' '
        }
      });
    }

  };


  const content = data ? data.map((value,index) => {
    return (
      <div key={index}>
        <a onClick={() => {
          onSuccess(value.customerId);
        }}>{value.customerName}</a>
      </div>
    );
  }) : null;


  return ((
    <>
      <Popover placement="bottomLeft" visible={content && !method ? content.length : false} content={content} trigger="focus">
        <Input
          onChange={(value) => {
            handleChange(value.target.value);
          }}
          value={val}
        />
      </Popover>
    </>));
};

export const ContactsId = (props) => {
  return (<InputNumber  {...props} />);
};

export const Setup = (props) => {
  return (<DatePicker  showTime {...props} />);
};
export const Legal = (props) => {
  return (<Input  {...props} />);
};
export const Utscc = (props) => {
  return (<Input  {...props} />);
};
export const CompanyType = (props) => {
  return (<AntdSelect
    showSearch
    allowClear
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
  return (<DatePicker showTime  {...props} />);
};
export const SignIn = (props) => {
  return (<Input  {...props} />);
};
export const Introduction = (props) => {
  return (<Input.TextArea  {...props} />);
};

export const DeptId = (props) => {
  return (<Input   {...props} />);
};
export const ClientId = (props) => {
  return (<Select  api={apiUrl.customerIdSelect} {...props} />);
};

export const client = (props) => {
  return (<Input   {...props} />);
};

export const Job = (props) => {
  return (<Input  {...props} />);
};

export const Dept = (props) => {
  return (<Input   {...props} />);
};

export const Client = (props) => {
  return (<Select  api={apiUrl.customerIdSelect} {...props} />);
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
      <Radio value={0}>代理商</Radio>
      <Radio value={1}>终端用户</Radio>
    </Radio.Group>
  );
};

export const Note = (props) => {
  return (<Input.TextArea   {...props} />);
};

export const CustomerLevelId = (props) => {
  return (<Select  api={apiUrl.CustomerLevelIdSelect}  {...props} />);
};

export const OriginId = (props) => {
  return (<Select  api={apiUrl.OriginIdSelect}  {...props} />);
};

export const UserName = (props) => {
  return (<Select  api={apiUrl.UserIdSelect}  {...props} />);
};

export const Emall = (props) => {
  return (<Input   {...props} />);
};

export const Url = (props) => {
  return (<Input   {...props} />);
};


export const IndustryOne = (props) => {
  return (<TreeSelect api={apiUrl.crmIndustryTreeView}  {...props} />);
};


