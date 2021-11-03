/**
 * 编码规则字段配置页
 *
 * @author song
 * @Date 2021-10-22 17:20:05
 */

import React from 'react';
import {
  Input,
  InputNumber,
  TimePicker,
  DatePicker,
  Select as AntdSelect,
  Checkbox,
  Radio,
  AutoComplete,
  Button
} from 'antd';
import Tree from '@/components/Tree';
import Cascader from '@/components/Cascader';
import Select from '@/components/Select';
import * as apiUrl from '../codingRulesUrl';
import {codingRulesClassificationListSelect} from '../codingRulesUrl';
import {DeleteOutlined, UserOutlined} from '@ant-design/icons';

export const CodingRulesClassificationId = (props) => {
  return (<Select api={apiUrl.codingRulesClassificationListSelect} {...props} />);
};
export const Name = (props) => {
  return (<Input {...props} />);
};
export const CodingRules = (props) => {
  return (<Input {...props} />);
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
export const Display = (props) => {
  return (<Input {...props} />);
};
export const DeptId = (props) => {
  return (<Input {...props} />);
};


export const Values = (props) => {

  const {module,onChange,value} = props;
  console.log(value);

  const modules = () => {
    switch (module) {
      case 0:
        return [{
          label: '订单',
          value: '订单'
        }];
      case 1:
        return [{
          label: '工具',
          value: '工具'
        }];
      case 2:
        return [{
          label: '质检',
          value: '质检'
        }];
      default:
        return [];
    }
  };

  const options = [
    // eslint-disable-next-line no-template-curly-in-string
    {
      label: '通用',
      options: [
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${YYYY} 年（四位数）', value: '${YYYY}'},
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${YY} 年（两位数）', value: '${YY}'},
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${MM} 月', value: '${MM}'},
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${dd} 日', value: '${dd}'},
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${randomInt} 随机数', value: '${randomInt}'},
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${week} 当前日期所属年份的第几周', value: '${week}'},
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${randomString} 随机字符串', value: '${randomString}'},
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${quarter} 当前季度', value: '${quarter}'},
      ]
    },
    {
      label: '模块',
      options: modules()
    },
  ];

  return (<>
    <AutoComplete
      allowClear
      value={value}
      options={options}
      style={{width: 200}}
      placeholder="选择或自定义规则"
      onChange={(value)=>{
        onChange(value);
      }}
      onSelect={(value)=>{
        onChange(value);
      }}
      filterOption={(input, option) =>
        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    />
  </>);
};


export const Module = (props) => {

  const options = [
    {label: '订单', value: 0},
    {label: '工具', value: 1},
    {label: '质检', value: 2},
  ];

  return (<AntdSelect options={options} {...props} />);
};
