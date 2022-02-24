import React from 'react';
import moment from 'moment';
import {TimePicker as AntTimePicker} from 'antd';

const TimePicker = ({value, onChange, disabled, width}) => {

  return <AntTimePicker
    disabled={disabled}
    style={{width: width || null}}
    value={moment(value,'HH:mm:ss')}
    onChange={(date, dateString) => {
      onChange(dateString);
    }} />;


};

export default TimePicker;
