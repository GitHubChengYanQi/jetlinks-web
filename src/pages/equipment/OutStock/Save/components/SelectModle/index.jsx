import React, {useRef, useState} from 'react';
import {Button, Input, Space} from 'antd';
import Modal from '@/components/Modal';
import Terminal from '@/pages/monitor/LeftTree/components/Terminal';

const SelectModle = ({
  onChange = () => {
  },
  disabled
}) => {

  const ref = useRef();
  const inputRef = useRef();

  const [model, setModel] = useState({});
  console.log(model);

  const [name, setName] = useState();

  return <>
    <Input
      ref={inputRef}
      disabled={disabled}
      onFocus={() => {
        ref.current.open(false);
        inputRef.current.blur();
      }}
      value={name}
      placeholder="请选择设备型号"
    />
    <Modal
      destroyOnClose={false}
      width={500}
      headTitle="选择设备型号"
      ref={ref}
      footer={<Space>
        <Button onClick={() => ref.current.close()}>取消</Button>
        <Button type="primary" onClick={() => {
          setName(model.name);
          onChange(model.modelId);
          ref.current.close();
        }}>确认</Button>
      </Space>}
    >
      <div style={{padding: 24}}>
        <Terminal value={module} select onChange={(modelId, type, module) => {
          setModel(module);
        }} />
      </div>
    </Modal>
  </>;
};

export default SelectModle;
