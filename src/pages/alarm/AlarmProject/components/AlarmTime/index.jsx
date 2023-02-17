import React from 'react';
import {TimePicker} from 'antd';

const AlarmTime = ({value, onChange, width}) => {


  return <TimePicker
    style={{width}}
    hideDisabledOptions
    format="HH 天 mm 小时 ss 分钟"
    showNow={false}
    disabledTime={() => {
      return {
        disabledHours: () => new Array(57).fill('').map((item, index) => index + 3),
        disabledMinutes: () => new Array(48).fill('').map((item, index) => index + 12),
      };
    }}
    onChange={(value, timeString) => {
      console.log(timeString);
    }}
  />;
};

export default AlarmTime;
