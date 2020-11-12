import React, {useRef, useState} from 'react';
import {Drawer} from 'antd';
import * as Icon from '@ant-design/icons';

console.log(Icon.HomeOutlined)

const SelectIcon = () => {

  const [visible, setVisible] = useState(true);

  return (
    <>
      <Drawer visible={visible}>

      </Drawer>
    </>
  );
};
export default SelectIcon;
