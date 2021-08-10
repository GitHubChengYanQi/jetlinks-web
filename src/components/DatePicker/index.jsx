import React from 'react';
import moment from 'moment';
import {DatePicker as AntDatePicker} from 'antd';

const DatePicker = ({value,onChange})=>{

  const val = moment(value);
  onChange(val);
  return <AntDatePicker value={val} showTime onChange={(date, dateString)=>{
    onChange(date, dateString);
  }} />;
};

export default DatePicker;
