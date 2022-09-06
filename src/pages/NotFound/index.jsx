import React from 'react';
import { Result } from 'antd';


export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      style={{
        background: 'none'
      }}
      subTitle='抱歉，你访问的页面不存在'
    />
  );
}
