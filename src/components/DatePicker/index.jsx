import React from 'react';
import moment from 'moment';
import {DatePicker as AntDatePicker} from 'antd';

const DatePicker = ({value, onChange, width}) => {

  if (value) {
    const val = moment(value);
    return <AntDatePicker style={{width: width || null}} value={val} showTime onChange={(date, dateString) => {
      onChange(date, dateString);
    }} />;
  }else {
    return <AntDatePicker style={{width: width || null}} showTime onChange={(date, dateString) => {
      onChange(date, dateString);
    }} />;
  }


};

export default DatePicker;
