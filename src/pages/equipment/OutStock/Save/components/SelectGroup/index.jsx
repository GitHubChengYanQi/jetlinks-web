import React, {useRef, useState} from 'react';
import {Button, Input, Space} from 'antd';
import Modal from '@/components/Modal';
import Group from '@/pages/monitor/LeftTree/components/Group';

const SelectGroup = ({
  value,
  onChange = () => {
  },
  disabled
}) => {

  const ref = useRef();
  const inputRef = useRef();

  const [group, setGroup] = useState({});

  const [name, setName] = useState();

  return <>
    <Input
      ref={inputRef}
      disabled={disabled}
      onFocus={() => {
        ref.current.open(false);
        inputRef.current.blur();
      }}
      value={value ? name : '全部分组'}
      placeholder="请选择分组"
    />
    <Modal
      destroyOnClose={false}
      width={500}
      headTitle="选择分组"
      ref={ref}
      footer={<Space>
        <Button onClick={() => ref.current.close()}>取消</Button>
        <Button type="primary" onClick={() => {
          setName(group.title);
          onChange(group.key === '0' ? null : group.key);
          ref.current.close();
        }}>确认</Button>
      </Space>}
    >
      <div style={{padding: 24}}>
        <Group all value={module} onChange={(modelId, type, module) => {
          setGroup(module);
        }}/>
      </div>
    </Modal>
  </>;
};

export default SelectGroup;
