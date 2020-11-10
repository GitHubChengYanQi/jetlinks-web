import React, {useState, useEffect} from 'react';
import {Cascader} from 'antd';
import {useRequest} from '@/util/Request';
import {menuTree} from '@/Config/ApiUrl/system/menu';


const MenuSelect = (props) => {
  const {value} = props;

  const {data} = useRequest(menuTree);

  if (data) {
    return (<Cascader changeOnSelect options={data} value={value} {...props} />);
  } else {
    return null;
  }

};

export default MenuSelect;
