import React from 'react';
import {InputNumber as AntInputNumber} from 'antd';

const InputNumber = ({placeholder,...props}) => {


  return <AntInputNumber controls={false} placeholder={placeholder} {...props} />;
};

export default InputNumber;
