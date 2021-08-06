import React from 'react';
import moment from 'moment';
import {DatePicker as AntDatePicker} from 'antd';

const DatePicker = ({value,onChange})=>{

  const val = moment(value);

  return <AntDatePicker value={val} onChange={(date, dateString)=>{
    onChange(date, dateString);
  }} />;
};

export default DatePicker;
