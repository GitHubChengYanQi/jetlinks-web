import React from 'react';
import {Cascader as AntCascader} from 'antd';
import {useRequest} from '@/util/Request';


const Cascader = (props) => {
  const {value, api, ...other} = props;
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const {data} = useRequest(api);

  let valueArray = [];
  if (value && !Array.isArray(value)) {
    const tmpValue = value.split(',');
    for (let i = 0; i < tmpValue.length; i++) {
      const item = tmpValue[i];
      if (item) {
        valueArray.push(item);
      }
    }
    // valueArray = tmpValue;
  } else if( typeof value==="string") {
    valueArray = 0;
  }else {
    valueArray = value;
  }

  if (data) {
    return (<AntCascader changeOnSelect options={data} defaultValue={valueArray}  {...other} />);
  } else {
    return null;
  }

};

export default Cascader;
