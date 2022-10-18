import React, {useRef, useState} from 'react';
import {Button, Space} from 'antd';
import Modal from '@/components/Modal';
import Model from '@/pages/equipment/Model';

const SelectModle = ({
  value,
  onChange = () => {
  },
  disabled
}) => {

  const ref = useRef();

  const [module, setModule] = useState();

  return <>
    <Button
      disabled={disabled}
      style={{padding: 0}}
      type="link"
      onClick={() => {
        ref.current.open(false);
      }}
    >
      {value ? module.name : '请选择设备型号'}
    </Button>
    <Modal
      destroyOnClose={false}
      width={1200}
      headTitle="选择设备型号"
      ref={ref}
      footer={<Space>
        <Button onClick={() => ref.current.close()}>取消</Button>
        <Button type="primary" onClick={() => {
          onChange(module.modelId);
          ref.current.close();
        }}>保存</Button>
      </Space>}
    >
      <Model value={module} select onChange={(device) => {
        setModule(device || {});
      }}/>
    </Modal>
  </>;
};

export default SelectModle;
