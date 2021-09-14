import React from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const AddButton = ({onClick,type, style ,name,...props}) => {

  return (
    <Button type={type || 'primary'} {...props} onClick={onClick} style={style} className="button-left-margin" icon={<PlusOutlined />}>{name || '添加'}</Button>
  );
};

export default AddButton;
