import React from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const AddButton = ({onClick, ...props}) => {

  return (
    <Button type="primary" {...props} onClick={onClick} className="button-left-margin" icon={<PlusOutlined />}>添加</Button>
  );
};

export default AddButton;
