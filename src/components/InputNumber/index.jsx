import React from 'react';
import {InputNumber as AntInputNumber} from 'antd';

const InputNumber = ({...props}) => {


  return <AntInputNumber controls={false} {...props} />;
};

export default InputNumber;
