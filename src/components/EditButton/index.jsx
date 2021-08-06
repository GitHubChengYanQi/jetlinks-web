import React from 'react';
import {Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const EditButton = ({onClick, ...props}) => {

  return (
    <Button  {...props} onClick={onClick} className="button-left-margin" icon={<EditOutlined />} type='text'/>
  );
};

export default EditButton;
