import React from 'react';
import {Select as AntSelect} from 'antd';
import {useRequest} from '@/util/Request';

const Select = (props) => {
  const {value, api,defaultValue, ...other} = props;
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const {data} = useRequest(api);

  if (data) {
    return (<AntSelect options={data} defaultValue={defaultValue} {...other}  />);
  } else {
    return null;
  }
};

export default Select;
