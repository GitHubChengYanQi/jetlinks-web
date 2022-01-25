/**
 * 客户管理表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useState} from 'react';
import {Input, InputNumber, Select as AntdSelect, Radio, Popover, AutoComplete, Spin} from 'antd';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/customer/CustomerUrl';
import TreeSelect from '@/components/TreeSelect';
import {useRequest} from '@/util/Request';
import DatePicker from '@/components/DatePicker';
import {commonArea, CompanyRoleIdSelect, CustomerLevelIdSelect} from '@/pages/Crm/customer/CustomerUrl';
import Cascader from '@/components/Cascader';
import Amap from '@/components/Amap';
import CustomerSelect from '@/pages/Crm/customer/CustomerEdit/components/CustomerSelect';
import CascaderAdress from '@/pages/Crm/customer/components/CascaderAdress';
import OriginSelect from '@/pages/Crm/customer/components/OriginSelect';
import AdressMap from '@/pages/Crm/customer/components/AdressMap';
import moment from 'moment';

const {Option} = Select;


export const ContactsName = (props) => {
  return (<Input  {...props} />);
};

export const Location = (props) => {
  return (<Input  {...props} />);
};
export const Longitude = (props) => {
  const {location} = props;
  if (location) {
    props.onChange(location.length > 0 && location[0] && location[0][0]);
  }
  return (<InputNumber min={0} disabled  {...props} />);
};
export const Map = (props) => {
  return (<AdressMap {...props} />);
};
export const PhoneNumber = (props) => {
  return (<Input style={{width: '100%'}}  {...props} />);
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
export const Region = (props) => {
  return (<Cascader api={commonArea} {...props} />);
};
export const CompanyRoleId = (props) => {
  return (<Select width="100%" api={apiUrl.CompanyRoleIdSelect} {...props} />);
};
export const CustomerName = (props) => {

  const {value, onChange, supply, onSuccess} = props;

  const {loading, data, run} = useRequest({url: '/customer/list?limit=5&page=1', method: 'POST'}, {
    debounceInterval: 300,
  });

  const options = !loading ? data && data.map((value) => {
    return {
      value: value.customerName,
      label: value.customerName,
      id: value.customerId,
    };
  }) : [];


  return <>
    <AutoComplete
      dropdownMatchSelectWidth={100}
      options={options}
      placeholder={supply ? '搜索供应商' : '搜索客户'}
      value={value}
      onSelect={(value, option) => {
        onSuccess(option.id);
      }}
    >
      <Input.Search
        onChange={(value) => {
          onChange(value);
          run({
            data: {
              customerName: value.target.value,
              supply
            }
          });
        }}
      />
    </AutoComplete>
  </>;

};

export const ContactsId = (props) => {
  return (<InputNumber min={0}  {...props} />);
};

export const Setup = (props) => {
  return (<DatePicker disabledDate={(current) => {
    return current && current > moment().endOf('day');
  }}  {...props} />);
};
export const Legal = (props) => {
  const [visi, setVist] = useState();
  useEffect(() => {
    setVist(props.value);
  }, []);

  return (<Input disabled={visi} {...props} />);
};
export const Utscc = (props) => {
  const [visi, setVist] = useState();
  useEffect(() => {
    setVist(props.value);
  }, []);

  return (<Input disabled={visi}  {...props} />);
};
export const CompanyType = (props) => {
  return (<AntdSelect
    showSearch
    style={{maxWidth: 120}}
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
  return (<DatePicker disabledDate={(current) => {
    return current && current < moment().endOf('day');
  }} {...props} />);
};
export const SignIn = (props) => {
  return (<Input  {...props} />);
};
export const Introduction = (props) => {
  return (<Input.TextArea style={{width: '100%'}} showCount maxLength={100} {...props} />);
};

export const DeptId = (props) => {
  return (<Input   {...props} />);
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
  return (<Select api={apiUrl.customerIdSelect} {...props} />);
};

export const Status = (props) => {
  return (
    <Radio.Group {...props} defaultValue={0}>
      <Radio value={0}>潜在客户</Radio>
      <Radio value={1}>正式客户</Radio>
    </Radio.Group>
  );
};

export const Classification = (props) => {
  return (
    <Radio.Group {...props} defaultValue={0}>
      <Radio value={0}>代理商</Radio>
      <Radio value={1}>终端用户</Radio>
    </Radio.Group>
  );
};
export const Supply = (props) => {
  return (
    <Radio.Group {...props} defaultValue={0}>
      <Radio value={0}>否</Radio>
      <Radio value={1}>是</Radio>
    </Radio.Group>
  );
};

export const Note = (props) => {
  return (<Input.TextArea style={{width: '100%'}} showCount maxLength={100}  {...props} />);
};

export const CustomerLevelId = (props) => {
  const {loading,data} = useRequest(CustomerLevelIdSelect);

  useEffect(()=>{
    if (data){
      props.onChange(data && data[data.length-1].value);
    }
  },[data]);

  if (loading)
    return <Spin />;

  return (<AntdSelect options={data} {...props} />);
};

export const OriginId = (props) => {
  return (<OriginSelect width={120}  {...props} />);
};

export const UserName = (props) => {
  const {loading, data} = useRequest({url: '/rest/system/currentUserInfo', method: 'POST'});
  useEffect(() => {
    props.onChange(data && data.userId);
  }, [loading]);

  return (<Select width={120} api={apiUrl.UserIdSelect}  {...props} />);
};

export const Emall = (props) => {
  return (<Input   {...props} />);
};

export const Url = (props) => {
  return (<Input   {...props} />);
};


export const IndustryOne = (props) => {
  return (<Cascader api={apiUrl.crmIndustryTreeView}  {...props} />);
};


