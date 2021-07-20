import React from 'react';
import {Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const SeeButton = ({onClick, ...props}) => {

  return (
    <Button  {...props} onClick={onClick} className="button-left-margin" icon={<EditOutlined />}>查看</Button>
  );
};

export default SeeButton;
