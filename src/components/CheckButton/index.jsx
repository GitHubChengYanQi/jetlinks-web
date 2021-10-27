import React from 'react';
import {Button} from 'antd';
import {SelectOutlined} from '@ant-design/icons';

const CheckButton = ({onClick,style, ...props}) => {
  return (
    <Button size="small" {...props} style={style} onClick={onClick} type='link' icon={<SelectOutlined />}>选择</Button>
  );
};

export default CheckButton;
