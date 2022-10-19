import React, {useRef, useState} from 'react';
import {Button, Space} from 'antd';
import Modal from '@/components/Modal';
import InStock from '@/pages/equipment/InStock';

const SelectDevice = ({
  value,
  device: defaultDevice = {},
  onChange = () => {
  },
  disabled
}) => {

  const ref = useRef();

  const [device, setDevice] = useState(defaultDevice);

  return <>
    <Button
      disabled={disabled}
      style={{padding: 0}}
      type="link"
      onClick={() => {
        ref.current.open(false);
      }}
    >
      {value ? device.mac : '请选择设备MAC'}
    </Button>
    <Modal
      destroyOnClose={false}
      width={1200}
      headTitle="选择设备"
      ref={ref}
      footer={<Space>
        <Button onClick={() => ref.current.close()}>取消</Button>
        <Button type='primary' onClick={() => {
          onChange(device.deviceId);
          ref.current.close();
        }}>保存</Button>
      </Space>}
    >
      <InStock selectDevice={device} select onChange={(device) => {
        setDevice(device || {});
      }} />
    </Modal>
  </>;
};

export default SelectDevice;
