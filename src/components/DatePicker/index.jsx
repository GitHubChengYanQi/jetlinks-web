import React from 'react';
import moment from 'moment';
import {DatePicker as AntDatePicker} from 'antd';

const DatePicker = ({value,onChange,width})=>{

  const val = moment(value);
  onChange(val);
  return <AntDatePicker style={{width:width || null}} value={val} showTime onChange={(date, dateString)=>{
    onChange(date, dateString);
  }} />;
};

export default DatePicker;
