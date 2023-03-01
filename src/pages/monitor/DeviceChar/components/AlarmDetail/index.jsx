import React, {useState} from 'react';
import {Button, Descriptions, Radio, Tabs} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import AlarmProject from '@/pages/alarm/AlarmProject';
import {useRequest} from '@/util/Request';
import {deviceDetail, deviceEditAlarmCustom} from '@/pages/equipment/Equipment/url';

const AlarmDetail = (
  {
    device = {},
  }
) => {

  const [alarmCustom, setAlarmCustom] = useState(0);

  const {loading: detailLoading, refresh} = useRequest({
    ...deviceDetail,
    data: {deviceId: device.deviceId}
  }, {
    onSuccess: (res) => {
      setAlarmCustom(res.alarmCustom);
    }
  });

  const {loading, run} = useRequest(deviceEditAlarmCustom, {
    manual: true,
    onSuccess: () => {
      refresh();
    }
  });

  if (detailLoading) {
    return <ProSkeleton type="descriptions"/>;
  }

  return <>
    <Tabs
      items={[{key: '1', label: '基本信息'}]}
      tabBarExtraContent={<Button
        loading={loading}
        type="primary"
        onClick={() => {
          run({
            data: {deviceId: device.deviceId, alarmCustom}
          });
        }}>保存</Button>}
    />
    <Descriptions
      column={3}
      contentStyle={{color: '#000'}}
      bordered
    >
      <Descriptions.Item label="设备类型">{device.categoryName || '-'}</Descriptions.Item>
      <Descriptions.Item label="设备型号">{device.modelName || '-'}</Descriptions.Item>
      <Descriptions.Item label="终端备注">{device.remarks || '-'}</Descriptions.Item>
    </Descriptions>
    <br/>
    <Tabs
      tabBarExtraContent={<Radio.Group value={alarmCustom} onChange={({target: {value}}) => {
        setAlarmCustom(value);
      }}>
        <Radio value={0}>启用全局报警设置</Radio>
        <Radio value={1}>启用以下自定义报警设置</Radio>
      </Radio.Group>}
      items={[{key: '1', label: '报警项设置'}]}
    />
    <AlarmProject
      global={alarmCustom === 0}
      custom={alarmCustom === 1}
      modelId={device.modelId}
      deviceId={device.deviceId}
    />
  </>;
};

export default AlarmDetail;
