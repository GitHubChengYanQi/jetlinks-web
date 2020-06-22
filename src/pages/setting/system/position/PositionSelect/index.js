import React, {useState, forwardRef, useEffect} from 'react';
import {Select, Field} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {positionAllList} from '@/Config/ApiUrl/system/position';


const PositionSelect = (props) => {
  const {value} = props;

  const {request} = useRequest(positionAllList);
  const {data} = request();
  if (data) {
    return (<Select mode="multiple" dataSource={data.data} value={value} {...props} />);
  } else {
    return null;
  }
}

export default PositionSelect;