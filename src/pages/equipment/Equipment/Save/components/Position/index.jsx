import React from 'react';
import {InputNumber} from 'antd';
import Amap from '@/components/Amap';

const Position = ({
  value = [],
  onChange = () => {
  },
}) => {

  return <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
    <InputNumber
      style={{flexGrow: 1}}
      placeholder="请输入经度"
      value={value[0]}
      onChange={(number) => onChange([number, value[1]])} />
    <div>
      维度
    </div>
    <InputNumber
      style={{flexGrow: 1}}
      placeholder="请输入维度"
      value={value[1]}
      onChange={(number) => onChange([value[0], number])} />
    <Amap onChange={(value) => {
      console.log(value);
    }} />
  </div>;
};

export default Position;
