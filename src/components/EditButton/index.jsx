import React from 'react';
import {Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const EditButton = ({onClick, ...props}) => {

  return (
    <Button size="small" onClick={onClick} className="button-left-margin" icon={<EditOutlined />} type='link'  {...props}/>
  );
};

export default EditButton;
