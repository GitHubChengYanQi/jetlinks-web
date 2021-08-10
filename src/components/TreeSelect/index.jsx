import React from 'react';
import {TreeSelect as AntTreeSelect} from 'antd';
import {useRequest} from '@/util/Request';

const TreeSelect = (props) => {
  const {value, api,defaultValue, placeholder, ...other} = props;
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const {data} = useRequest(api);

  if (data) {
    return (<AntTreeSelect allowClear placeholder={placeholder} treeData={data} value={value?`${value}`:null} {...other}  />);
  } else {
    return null;
  }
};

export default TreeSelect;
