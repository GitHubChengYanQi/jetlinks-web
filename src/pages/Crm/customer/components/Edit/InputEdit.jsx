import React, {useState} from 'react';
import {Button, Input, Popover} from 'antd';

const InputEdit = ({value:values, onChange}) => {

  const [value, setValue] = useState(values);
  const [change,setChange] = useState(values);
  const [visiable,setVisiable] = useState();

  return (
    <div style={{display:'inline-block',cursor:'pointer'}}>
      <Popover visible={visiable} onVisibleChange={(visible)=>{
        setVisiable(visible);
      }} placement="bottom" title={
        <Input value={value} onChange={(value) => {
          setValue(value.target.value);
        }} />
      } content={<Button type="primary" style={{width: '100%'}} onClick={() => {
        setChange(value);
        setVisiable(false);
        onChange && typeof onChange === 'function' && onChange(value);
      }}>保存</Button>} trigger="click">
        {change || '未填写'}
      </Popover>
    </div>
  );
};

export default InputEdit;
