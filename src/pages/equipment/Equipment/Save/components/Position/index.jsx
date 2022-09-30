import React, {useState} from 'react';
import {Button, Drawer, InputNumber} from 'antd';
import Amap from '@/components/Amap';
import Icon from '@/components/Icon';

const Position = ({
  value = [],
  onChange = () => {
  },
  onPosition = () => {
  },
}) => {

  const [visible, setVisible] = useState(false);

  return <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
    <InputNumber
      style={{flexGrow: 1}}
      placeholder="请输入经度"
      value={value[0]}
      onChange={(number) => onChange([number, value[1]])}/>
    <div>
      维度
    </div>
    <InputNumber
      style={{flexGrow: 1}}
      placeholder="请输入维度"
      value={value[1]}
      onChange={(number) => onChange([value[0], number])}/>
    <Button type="text" onClick={() => {
      setVisible(true);
    }}><Icon type="icon-dingwei"/>定位</Button>
    <Drawer
      destroyOnClose
      open={visible}
      onClose={() => {
        setVisible(false);
      }}
      width="50%"
      title="定位">
      {visible && <Amap
        value={(value[0] && value[1]) ? value : []}
        onChange={(value) => {
          setVisible(false);
          const location = value?.location || [];
          onChange([location[0], location[1]]);
          onPosition(value?.city);
        }}/>}
    </Drawer>
  </div>;
};

export default Position;
