import React, {useState} from 'react';
import {Button, Drawer, InputNumber} from 'antd';
import Amap from '@/components/Amap';
import Icon from '@/components/Icon';
import Bmap from '@/components/Bmap';

const Position = ({
  value = [],
  onChange = () => {
  },
  width
}) => {

  const [visible, setVisible] = useState(false);

  return <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
    <InputNumber
      style={{flexGrow: 1, width}}
      placeholder="请输入经度"
      value={value[0]}
      onChange={(number) => onChange([number, value[1]])} />
    <div>
      维度：
    </div>
    <InputNumber
      style={{flexGrow: 1, width}}
      placeholder="请输入维度"
      value={value[1]}
      onChange={(number) => onChange([value[0], number])} />
    <Button type="text" onClick={() => {
      setVisible(true);
    }}><Icon type="icon-dingwei" />定位</Button>
    <Drawer
      destroyOnClose
      open={visible}
      onClose={() => {
        setVisible(false);
      }}
      width="50%"
      title="定位">
      {visible && <Bmap
        search
        value={(value[0] && value[1]) ? value : []}
        onChange={(value) => {
          setVisible(false);
          onChange([value[0], value[1]]);
        }} />}
    </Drawer>
  </div>;
};

export default Position;
