
import React from 'react';
import {Button} from 'antd';
import { SelectOutlined} from '@ant-design/icons';

const SelButton = ({onClick,type, style, ghost,name,...props}) => {

  return (
    <Button size="small" type="primary" {...props} onClick={onClick} icon={<SelectOutlined />}>批量选择</Button>
  );
};

export default SelButton;
