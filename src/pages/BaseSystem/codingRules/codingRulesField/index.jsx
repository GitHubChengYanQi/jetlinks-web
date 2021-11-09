/**
 * 编码规则字段配置页
 *
 * @author song
 * @Date 2021-10-22 17:20:05
 */

import React, {useEffect, useState} from 'react';
import {
  Input,
  InputNumber,
  TimePicker,
  DatePicker,
  Select as AntdSelect,
  Checkbox,
  Radio,
  AutoComplete,
  Button, Space
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

export const Note = (props) => {
  return (<Input.TextArea {...props} />);
};
export const State = (props) => {
  return (<Radio.Group {...props} >
    <Radio>是</Radio>
    <Radio>是</Radio>
  </Radio.Group>);
};


export const Values = (props) => {

  const {module, onChange, value} = props;

  const [state, setState] = useState(true);

  useEffect(() => {
    if (value) {
      setState('自定义');
    }
  }, []);

  const modules = () => {
    switch (module) {
      case 0:
        return [{
          // eslint-disable-next-line no-template-curly-in-string
          label: '${skuClass}分类码',
          // eslint-disable-next-line no-template-curly-in-string
          value: '${skuClass}'
        }];
      default:
        return [];
    }
  };

  const serial = [
    {
      label: '流水号',
      options: [
        // eslint-disable-next-line no-template-curly-in-string
        {label: '${serial} 流水号', value: '${serial}'},
      ]
    }
  ];

  const input = [
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

  const options = [
    ...input,
    ...serial,
    {
      label: '自定义',
      options: [
        // eslint-disable-next-line no-template-curly-in-string
        {label: '自定义', value: '自定义'},
      ]
    },
  ];

  const menu = () => {
    switch (state) {
      case '流水号':
        return <Space>
          <AntdSelect
            placeholder="选择编码类型"
            style={{minWidth: 194, display: 'inline-block'}}
            options={[
              ...input,
              {
                label: '自定义',
                options: [
                  // eslint-disable-next-line no-template-curly-in-string
                  {label: '自定义', value: '自定义'},
                ]
              },
            ]}
            allowClear
            showSearch
            value={`\${serial} 流水号`}
            filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onSelect={(value) => {
              onChange(value);
              if (value === '自定义') {
                setState('自定义');
                onChange(null);
              } else {
                setState(true);
              }
            }} />
          <InputNumber placeholder="长度" defaultValue="5" min="0" max="5" onChange={(value) => {
            onChange(`\${serial[${value}]}`);
          }} />
        </Space>;
      case '自定义':
        return <Space>
          <AntdSelect
            value="自定义"
            style={{minWidth: 50}}
            options={[...input,...serial]}
            dropdownMatchSelectWidth={292}
            onSelect={(value) => {
              onChange(value);
              if (value === `\${serial}`) {
                setState('流水号');
                onChange(`\${serial[5]}`);
              } else {
                setState(true);
              }
            }} />
          <Input value={value} style={{width: 200}} placeholder="输入自定义编码" onChange={(value) => {
            onChange(value.target.value);
          }} />
        </Space>;
      default:
        return <AntdSelect
          placeholder="选择编码类型"
          style={{minWidth: 292, display: 'inline-block'}}
          options={options}
          allowClear
          showSearch
          value={value}
          filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onSelect={(value) => {
            if (value === '自定义') {
              setState('自定义');
              onChange(null);
            } else if (value === `\${serial}`) {
              setState('流水号');
              onChange(`\${serial[5]}`);
            } else {
              setState(true);
              onChange(value);
            }
          }} />;
    }
  };

  return (<div>
    {menu()}
  </div>);
};


export const Module = (props) => {

  const options = [
    {label: '物料', value: 0},
  ];

  return (<AntdSelect options={options} {...props} />);
};
