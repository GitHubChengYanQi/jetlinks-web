import React, {useState} from 'react';
import {Popover, Select} from 'antd';


const SelectEdit = ({value: values, val, onChange,data}) => {

  const [value, setValue] = useState(values);
  const [change, setChange] = useState(val);
  const [visiable, setVisiable] = useState();

  return (
    <div style={{display: 'inline-block', cursor: 'pointer'}}>
      <Popover placement="bottom" visible={visiable} onVisibleChange={(valuhe) => {
        setVisiable(valuhe);
      }} trigger="click" content={
        <Select
          value={value}
          style={{width:200}}
          options={data}
          onSelect={(value, option) => {
            setVisiable(false);
            setValue(value);
            setChange(option.label);
            typeof onChange === 'function' && onChange(value);
          }}
        />}>
        {change || '未填写'}
      </Popover>
    </div>
  );
};

export default SelectEdit;
