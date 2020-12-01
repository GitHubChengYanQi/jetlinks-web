import React from 'react';
import {Select as AntSelect} from 'antd';
import {useRequest} from '@/util/Request';

const Select = (props) => {
  const {value, api, defaultValue, ...other} = props;
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const {data} = useRequest(api);

  let valueArray = [];
  const {mode} = other;
  if (value) {
    if (!Array.isArray(value)) {
      if (mode === 'multiple' || mode === 'tag') {
        const tmpValue = value.split(',');
        for (let i = 0; i < tmpValue.length; i++) {
          const item = tmpValue[i];
          if (item) {
            valueArray.push(item);
          }
        }
      } else {
        const tmpValue = value.split(',');
        valueArray = tmpValue[0] || [];
      }
    } else {
      valueArray = value;
    }
  } else if (mode !== 'multiple' && mode !== 'tag') {
    valueArray = '';
  }

  if (data) {
    return (<AntSelect options={data} value={valueArray} {...other}  />);
  } else {
    return null;
  }
};

export default Select;
