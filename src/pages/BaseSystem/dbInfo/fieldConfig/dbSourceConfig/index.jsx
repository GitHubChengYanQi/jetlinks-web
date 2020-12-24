import React from 'react';
import {Button} from "antd";

const DbSourceConfig = ({value}) => {

  if (typeof value !== 'object') {
    return (<span>无需配置</span>);
  }
  switch (value.type) {
    case 'select':
      return (
        <>
          <Button>选择数据接口</Button>
        </>
      );
    case 'checkbox':
      return (
        <>
          <Button>配置</Button>
        </>
      );
    default:
      return (<span>无需配置</span>);
  }
};

export default DbSourceConfig;
