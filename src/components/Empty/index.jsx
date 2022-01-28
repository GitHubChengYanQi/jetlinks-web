import React from 'react';
import {Empty as AntEmpty} from 'antd';


const Empty = ({
  style,
  description
}) => {

  return <AntEmpty
    style={style}
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    description={description || '暂无数据'}
  />;
};

export default Empty;
