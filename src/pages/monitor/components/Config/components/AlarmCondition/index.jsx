import React, {useState} from 'react';
import {Select, Space, Tooltip} from 'antd';
import {isArray} from '@/util/Tools';
import {QuestionCircleOutlined} from '@ant-design/icons';

const AlarmCondition = ({
  value,
  onChange = () => {
  },
  show,
  record = {},
}) => {

  const boolean = record.conditionType === 'boolean';

  const [alarmConditionTitle, setAlarmConditionTitle] = useState(record.alarmConditionTitle);

  if (!boolean && isArray(record.conditions).length === 0) {
    return '暂无条件';
  }

  const options = boolean ? [
    {label: '=', value: '7'}
  ] : record.conditions.map(item => ({label: item.symbol, value: item.condition, title: item.title}));


  return <Space align="center">
    <Select
      bordered={!show}
      open={show ? false : undefined}
      suffixIcon={show && null}
      placeholder="请选择条件"
      style={{width: 100}}
      value={value}
      onChange={(alarmCondition, option) => {
        setAlarmConditionTitle(option.title);
        onChange({
          alarmCondition,
          alarmConditionName: option.label,
          alarmConditionTitle: option.title,
          value: null
        }, record.key);
      }}>
      {options.map((item, index) => {
        return <Select.Option key={index} value={item.value} title={item.title} label={item.label}>
          <div title={item.title}>{item.label}</div>
        </Select.Option>;
      })}
    </Select>
    <Tooltip placement="top" title={boolean ? '布尔类型' : alarmConditionTitle}>
      <QuestionCircleOutlined />
    </Tooltip>
  </Space>;
};

export default AlarmCondition;
