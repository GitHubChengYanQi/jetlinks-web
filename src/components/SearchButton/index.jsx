import React from 'react';
import {Button} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

const SearchButton = ({onClick, ...props}) => {

  return (
    <Button type="primary" {...props} onClick={onClick} className="button-left-margin" icon={<SearchOutlined />}>搜索</Button>
  );
};

export default SearchButton;
