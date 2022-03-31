import React, {useState} from 'react';
import {Divider} from 'antd';
import {DownOutlined} from '@ant-design/icons';

const Overflow = ({children,title,defaultHeight}) => {

  const [height, setHeight] = useState(defaultHeight || 100);

  return (
    <div style={{height, overflow: 'hidden', position: 'relative',}}>
      {children}
      <div
        hidden={height === 'auto'}
        style={{position: 'absolute', bottom: 0, backgroundColor: '#fff', width: '100%'}}
        onClick={() => {
          setHeight('auto');
        }}>
        <Divider
          style={{cursor: 'pointer'}}
          onClick={() => {

          }}>
          {title || <DownOutlined/>}
        </Divider>
      </div>
    </div>
  );
};

export default Overflow;
