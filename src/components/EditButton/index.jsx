import React from 'react';
import {Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const EditButton = ({onClick,style, ...props}) => {

  return (
    <Button size="small" onClick={onClick} style={style} className="right-margin" icon={<EditOutlined />} type='link'  {...props}/>
  );
};

export default EditButton;
