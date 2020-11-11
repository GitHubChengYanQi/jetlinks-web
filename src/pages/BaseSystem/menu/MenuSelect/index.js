import React, {useState, useEffect} from 'react';
import {Cascader} from 'antd';
import {useRequest} from '@/util/Request';
import {menuTree} from '@/Config/ApiUrl/system/menu';


const MenuSelect = (props) => {
  const {value, ...other} = props;

  const {data} = useRequest(menuTree);
  // {...props}

  let valueArray = [];
  if (value && !Array.isArray(value)) {
    const tmpValue = value.split(',');
    for (let i = 0; i < tmpValue.length; i++) {
      const item = tmpValue[i];
      if (item) {
        valueArray.push(item.substring(1, item.length - 1));
      }
    }
  } else {
    valueArray = value;
  }

  if (data) {
    return (<Cascader changeOnSelect options={data} defaultValue={valueArray}  {...other} />);
  } else {
    return null;
  }

};

export default MenuSelect;
