import React, {useState} from 'react';
import {Popover, Select} from 'antd';
import DatePicker from '@/components/DatePicker';
import moment from 'moment';

const DateEdit = ({value,onChange,disabledDate}) => {

  const [change, setChange] = useState(value);
  const [visiable, setVisiable] = useState();

  return (
    <div style={{display: 'inline-block', cursor: 'pointer'}}>
      <Popover placement="bottom" visible={visiable} onVisibleChange={(value) => {
        setVisiable(value);
      }} trigger="click" content={<DatePicker disabledDate={disabledDate} onChange={(value,dateString)=>{
        setChange(dateString);
        setVisiable(false);
        typeof onChange === 'function' && onChange(dateString);
      }} />} >
        {change || '未填写'}
      </Popover>
    </div>
  );
};

export default DateEdit;
