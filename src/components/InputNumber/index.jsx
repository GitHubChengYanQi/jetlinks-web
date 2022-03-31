import React, {useState} from 'react';
import {InputNumber as AntInputNumber} from 'antd';

const InputNumber = (
  {
    placeholder,
    onBlur = () => {
    },
    value,
    onChange = () => {
    },
    ...props
  }) => {

  const [number, setNumber] = useState(value);

  return <AntInputNumber
    controls={false}
    value={value || number}
    placeholder={placeholder}
    {...props}
    onChange={(value) => {
      onChange(value);
      setNumber(value);
    }}
    onBlur={() => {
      onBlur(number);
    }}
  />;
};

export default InputNumber;
