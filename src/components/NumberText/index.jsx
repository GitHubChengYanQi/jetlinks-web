import React from 'react';
import {Input} from 'antd';

const NumberText = ({onChange, ...props}) => {

  const onRegChange = (e) => {
    const {value} = e.target;
    const reg = /^\d+$/;
    if ((!isNaN(value) && reg.test(value))) {
      onChange(value);
    }
  };

  return <>
    <Input
      {...props}
      onChange={onRegChange}
    />
  </>;
};

export default NumberText;
