import React from 'react';
import {Button} from 'antd';
import {SelectOutlined} from '@ant-design/icons';

const CheckButton = ({onClick, ...props}) => {
  return (
    <Button size="small" {...props} onClick={onClick} className="button-left-margin" icon={<SelectOutlined />}>选择</Button>
  );
};

export default CheckButton;
