/**
 * 询价任务字段配置页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React from 'react';
import {Input, Radio, Spin, Select as AntSelect} from 'antd';
import Coding from '@/pages/Erp/tool/components/Coding';
import Select from '@/components/Select';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';
import {customerLevelIdSelect} from '@/pages/Crm/customer/crmCustomerLevel/crmCustomerLevelUrl';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';


export const Name = (props) => {
  return (<Input  {...props} />);
};

export const Codings = (props) => {
  return (<Coding  {...props} />);
};

export const Date = (props) => {
  return (<DatePicker {...props} />);
};


export const Remark = (props) => {
  return (<Input.TextArea rows={4} placeholder="请输入采购单备注" {...props} />);
};

export const Currency = (props) => {
  const {loading, data} = useRequest({
    url: '/Enum/money',
    method: 'GET'
  });

  if (loading) {
    return <Spin />;
  }
  const options = data ? data.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  }) : [];

  return (<AntSelect style={{width:100}} defaultValue='人民币' options={options} {...props} />);
};

export const InquiryTaskName = (props) => {
  return (<Input {...props} />);
};
export const UserId = (props) => {
  return (<Select api={UserIdSelect} width={200} {...props} />);
};
export const Deadline = (props) => {
  return (<DatePicker {...props} />);
};
export const SupplierLevel = (props) => {
  return (<Select api={customerLevelIdSelect} {...props} />);
};
export const IsSupplier = (props) => {
  return (<Radio.Group {...props}><Radio value="1">是</Radio><Radio value="0">否</Radio></Radio.Group>);
};
export const CreateTime = (props) => {
  return (<Input {...props} />);
};
export const UpdateTime = (props) => {
  return (<Input {...props} />);
};
export const CreateUser = (props) => {
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
