import React, {useState, useEffect} from 'react';
import {CascaderSelect} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {menuTree} from '@/Config/ApiUrl/system/menu';


const MenuSelect = (props) => {
  const {value} = props;

  const {request} = useRequest(menuTree);

  const {data} = request();

  if (data) {
    return (<CascaderSelect changeOnSelect dataSource={data.data} value={value} {...props} />);
  } else {
    return null;
  }

}

export default MenuSelect;