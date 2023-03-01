import React from 'react';
import {Select, Space} from 'antd';

export const Total = (props) => {
  return <Space>
    <Select
      style={{minWidth:100}}
      {...props}
      options={[{label: 50, value: 50}, {label: 100, value: 100}, {label: 200, value: 200}]}
      placeholder="请选择短信条数"/>
    <span style={{color: 'red'}}>注：年发送短信数量</span>
  </Space>;
};
