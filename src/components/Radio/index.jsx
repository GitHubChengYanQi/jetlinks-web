import React from 'react';
import {Radio as AntRadio} from 'antd';
import {useRequest} from '@/util/Request';


const Radio = (props) => {
  const {value, api, options, ...other} = props;
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const {data} = useRequest(api, options);

  if (data) {
    return (<AntRadio.Group options={data} defaultValue={value}  {...other} />);
  } else {
    return null;
  }

};

export default Radio;
