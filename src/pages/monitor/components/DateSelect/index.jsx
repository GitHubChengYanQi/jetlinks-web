import {DatePicker, Select, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment';

const {Option} = Select;

const PickerWithType = ({type, onChange}) => {
  const props = {allowClear: false, style: {width: 300}};
  switch (type) {
    case 'date':
      return <DatePicker
        defaultValue={moment()}
        onChange={(value, dateString) => {
          const newDates = [];
          newDates.push(moment(dateString));
          newDates.push(moment(dateString));
          onChange(newDates);
        }}
        {...props}
      />;
    case 'week':
      return <DatePicker
        picker={type}
        onChange={(value) => {
          const newDates = [];
          newDates.push(moment(value).startOf('isoWeek'));
          newDates.push(moment(value).endOf('isoWeek'));
          onChange(newDates);
        }}
        {...props}
      />;
    case 'month':
      return <DatePicker
        picker={type}
        onChange={(value, dateString) => {
          const newDates = [];
          newDates.push(moment(dateString).startOf('month'));
          newDates.push(moment(dateString).endOf('month'));
          onChange(newDates);
        }}
        {...props}
      />;
    case 'quarter':
      return <DatePicker
        picker={type}
        onChange={(value) => {
          const newDates = [];
          newDates.push(moment(value).startOf('quarter'));
          newDates.push(moment(value).endOf('quarter'));
          onChange(newDates);
        }}
        {...props}
      />;
    case 'year':
      return <DatePicker
        picker={type}
        onChange={(value) => {
          const newDates = [];
          newDates.push(moment(value).startOf('year'));
          newDates.push(moment(value).endOf('year'));
          onChange(newDates);
        }}
        {...props}
      />;
    default:
      return <DatePicker.RangePicker
        {...props}
        onChange={(date, dateString = []) => {
          const newDates = [];
          newDates.push(moment(dateString[0]));
          newDates.push(moment(dateString[1]));
          onChange(newDates);
        }}
      />;
  }
};

const DateSelect = (
  {
    onChange = () => {
    }
  }
) => {

  const [type, setType] = useState('date');

  useEffect(() => {
    onChange([moment().format('YYYY/MM/DD 00:00:00'), moment().format('YYYY/MM/DD 23:59:59')]);
  }, []);

  return (
    <Space>
      <Select style={{width: 100}} value={type} onChange={setType}>
        <Option value="date">天</Option>
        <Option value="week">周</Option>
        <Option value="month">月</Option>
        <Option value="quarter">季度</Option>
        <Option value="year">年</Option>
        <Option value="diy">自定义</Option>
      </Select>
      <PickerWithType type={type} onChange={(dates = []) => {
        onChange([dates[0]?.format('YYYY/MM/DD 00:00:00'), dates[1]?.format('YYYY/MM/DD 23:59:59')]);
      }} />
    </Space>
  );
};
export default DateSelect;
