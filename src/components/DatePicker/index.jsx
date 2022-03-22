import React from 'react';
import moment from 'moment';
import {DatePicker as AntDatePicker} from 'antd';

const DatePicker = (
  {
    value,
    onChange = () => {
    },
    disabled,
    disabledDate,
    showTime,
    width,
    style,
    RangePicker,
  }) => {

  // currentDate && currentDate < moment().subtract(1, 'days') 禁用今天之前的时间
  // currentDate && currentDate < moment().endOf(1, 'days') 只能选择今天之后的时间

  if (RangePicker) {
    return <AntDatePicker.RangePicker
      disabled={disabled}
      disabledDate={disabledDate}
      style={{...style, width: width || null}}
      value={value && moment(value)}
      showTime={showTime}
      onChange={(date, dateString) => {
        onChange(dateString);
      }} />;
  }
  return <AntDatePicker
    disabled={disabled}
    disabledDate={disabledDate}
    style={{...style, width: width || null}}
    value={value && moment(value)}
    showTime={showTime}
    onChange={(date, dateString) => {
      onChange(dateString);
    }} />;


};

export default DatePicker;
