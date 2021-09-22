import React from 'react';
import moment from 'moment';
import {DatePicker as AntDatePicker} from 'antd';

const DatePicker = ({value, onChange,disabled,disabledDate, showTime,width}) => {

  if (value) {
    const val = moment(value);
    return <AntDatePicker disabled={disabled} disabledDate={disabledDate} style={{width: width || null}} value={val} showTime={showTime} onChange={(date, dateString) => {
      onChange(date, dateString);
    }}  />;
  }else {
    return <AntDatePicker disabledDate={disabledDate} style={{width: width || null}}  showTime={showTime} onChange={(date, dateString) => {
      onChange(date, dateString);
    }} />;
  }


};

export default DatePicker;
