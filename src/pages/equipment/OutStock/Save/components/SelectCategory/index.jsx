import React, {useRef, useState} from 'react';
import {Button, Space} from 'antd';
import Modal from '@/components/Modal';
import Category from '@/pages/equipment/Category';

const SelectCategory = ({
  value,
  onChange = () => {
  },
  disabled
}) => {

  const ref = useRef();

  const [category, setCategory] = useState();

  return <>
    <Button
      disabled={disabled}
      style={{padding: 0}}
      type="link"
      onClick={() => {
        ref.current.open(false);
      }}
    >
      {value ? category.name : '请选择设备类别'}
    </Button>
    <Modal
      destroyOnClose={false}
      width={1200}
      headTitle="选择设备类别"
      ref={ref}
      footer={<Space>
        <Button onClick={() => ref.current.close()}>取消</Button>
        <Button type="primary" onClick={() => {
          onChange(category.categoryId);
          ref.current.close();
        }}>保存</Button>
      </Space>}
    >
      <Category value={category} select onChange={(device) => {
        setCategory(device || {});
      }}/>
    </Modal>
  </>;
};

export default SelectCategory;
