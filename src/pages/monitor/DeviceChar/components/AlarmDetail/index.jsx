import React, {useState} from 'react';
import {Descriptions, Radio, Tabs} from 'antd';
import AlarmProject from '@/pages/alarm/AlarmProject';

const AlarmDetail = (
  {
    device = {},
  }
) => {

  const [type, setType] = useState('all');

  return <>
    <Tabs
      items={[{key: '1', label: '基本信息'}]}
    />
    <Descriptions
      column={2}
      contentStyle={{color: '#000'}}
      bordered
    >
      <Descriptions.Item label="设备类型">{device.categoryName || '-'}</Descriptions.Item>
      <Descriptions.Item label="设备型号">{device.modelName || '-'}</Descriptions.Item>
    </Descriptions>
    <br/>
    <Tabs
      tabBarExtraContent={<Radio.Group value={type} onChange={({target: {value}}) => {
        setType(value);
      }}>
        <Radio value="all">启用全局报警设置</Radio>
        <Radio value="diy">启用以下自定义报警设置</Radio>
      </Radio.Group>}
      items={[{key: '1', label: '报警项设置'}]}
    />
    <AlarmProject global={type === 'all'} custom={type === 'diy'}/>
  </>;
};

export default AlarmDetail;
