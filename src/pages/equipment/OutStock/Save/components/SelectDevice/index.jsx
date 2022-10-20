import React, {useRef, useState} from 'react';
import {Button, Input, Space} from 'antd';
import Modal from '@/components/Modal';
import InStock from '@/pages/equipment/InStock';

const SelectDevice = ({
  value,
  onChange = () => {
  },
  disabled
}) => {

  const ref = useRef();
  const inputRef = useRef();

  const [device, setDevice] = useState({});

  const [mac, setMac] = useState();

  return <>
    <Input
      ref={inputRef}
      disabled={disabled}
      onFocus={() => {
        ref.current.open(false);
        inputRef.current.blur();
      }}
      value={value ? mac : null}
      placeholder="请选择设备"
    />
    <Modal
      destroyOnClose={false}
      width={1200}
      headTitle="选择设备"
      ref={ref}
      footer={<Space>
        <Button onClick={() => ref.current.close()}>取消</Button>
        <Button type="primary" onClick={() => {
          setMac(device.mac);
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
