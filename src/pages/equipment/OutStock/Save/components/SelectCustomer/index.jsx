import React, {useRef, useState} from 'react';
import {Button, Input, Space} from 'antd';
import Modal from '@/components/Modal';
import Tenant from '@/pages/systemManage/Tenant';

const SelectCustomer = ({
  disabled,
  value,
  onChange = () => {
  }
}) => {

  const ref = useRef();
  const inputRef = useRef();

  const [customer, setCustomer] = useState({});

  const [name, setName] = useState();

  return <>
    <Input
      ref={inputRef}
      disabled={disabled}
      onFocus={() => {
        ref.current.open(false);
        inputRef.current.blur();
      }}
      value={value ? name : null}
      placeholder="请选择客户"
    />
    <Modal
      destroyOnClose={false}
      width={1200}
      headTitle="选择客户"
      ref={ref}
      footer={<Space>
        <Button onClick={() => ref.current.close()}>取消</Button>
        <Button type="primary" onClick={() => {
          setName(customer.name);
          onChange(customer.customerId);
          ref.current.close();
        }}>保存</Button>
      </Space>}
    >
      <Tenant customer={customer} select onChange={(device) => {
        setCustomer(device || {});
      }} />
    </Modal>
  </>;
};

export default SelectCustomer;
