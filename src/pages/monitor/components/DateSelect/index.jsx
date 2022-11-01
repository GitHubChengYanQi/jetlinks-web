import {DatePicker, Select, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {isArray} from '@/util/Tools';

const {Option} = Select;

const DateSelect = (
  {
    value,
    onChange = () => {
    }
  }
) => {

  const [day, setDay] = useState(0);

  useEffect(() => {
    onChange([moment().format('YYYY/MM/DD 00:00:00'), moment().format('YYYY/MM/DD 23:59:59')]);
  }, []);

  return (
    <Space>
      <Select style={{width: 100}} value={day} onChange={(value) => {
        if (value){
          onChange([moment().day(-value).format('YYYY/MM/DD 00:00:00'), moment().format('YYYY/MM/DD 23:59:59')]);
        }else {
          onChange([moment().format('YYYY/MM/DD 00:00:00'), moment().format('YYYY/MM/DD 23:59:59')]);
        }
        setDay(value);
      }}>
        <Option value={0}>今天</Option>
        <Option value={7}>最近7天</Option>
        <Option value={30}>最近30天</Option>
        <Option value={90}>最近90天</Option>
      </Select>
      <DatePicker.RangePicker
        value={isArray(value).length > 0 ? [moment(value[0]), moment(value[1])] : []}
        style={{width: 300}}
        allowClear={false}
        onChange={(date, dateString = []) => {
          const newDates = [];
          newDates.push(moment(dateString[0]).format('YYYY/MM/DD 00:00:00'));
          newDates.push(moment(dateString[1]).format('YYYY/MM/DD 23:59:59'));
          onChange(newDates);
        }}
      />
    </Space>
  );
};
export default DateSelect;
