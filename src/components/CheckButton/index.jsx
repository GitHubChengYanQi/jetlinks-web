import React from 'react';
import {Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const CheckButton = ({onClick, ...props}) => {
  return (
    <Button  {...props} onClick={onClick} className="button-left-margin" icon={<EditOutlined />}>选择</Button>
  );
};

export default CheckButton;
