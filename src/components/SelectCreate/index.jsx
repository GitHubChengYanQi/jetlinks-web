import React, {useRef} from 'react';
import {Button, Space, Spin} from 'antd';
import Select from '@/components/Select';
import {useRequest} from '@/util/Request';
import Modal from '@/components/Modal';

const SelectCreate = ({
  value,
  onChange = () => {
  },
  component,
  api,
  title,
  createTitle,
  width,
  response = () => {
  },
  ...props
}) => {

  const compoentRef = useRef();

  const ref = useRef();

  const {loading, data, refresh} = useRequest(api, {manual: !api});

  if (loading) {
    return <Spin />;
  }

  return <>
    <Select
      options={[{label: <a>{createTitle}</a>, value: 'add'},
        ...(data || [])]}
      onChange={(value) => {
        if (value === 'add') {
          return ref.current.open(false);
        }
        onChange(value);
      }}
      value={value}
      {...props}
    />

    <Modal
      width={width}
      headTitle={title}
      compoentRef={compoentRef}
      component={component}
      footer={<Space>
        <Button type="primary" onClick={() => {
          compoentRef.current.submit();
        }}>保存</Button>
        <Button onClick={() => {
          ref.current.close();
        }}>取消</Button>
      </Space>}
      onSuccess={(res) => {
        const values = response(res);
        console.log(values);
        if (values) {
          onChange(values);
        }
        refresh();
        ref.current.close();
      }}
      ref={ref}
    />
  </>;
};

export default SelectCreate;
