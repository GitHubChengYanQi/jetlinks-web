import React from 'react';
import {Tag} from 'antd';

const CustomerLevel = ({level, children}) => {
  switch (level) {
    case 5:
      return (<Tag color="purple">{children}</Tag>);
    case 4:
      return (<Tag color="geekblue">{children}</Tag>);
    case 3:
      return (<Tag color="blue">{children}</Tag>);
    case 2:
      return (<Tag color="cyan">{children}</Tag>);
    case 1:
    default:
      return (<Tag color="green">{children}</Tag>);
  }

};
export default CustomerLevel;
