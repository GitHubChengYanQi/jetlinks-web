import React, {useRef} from 'react';
import {useBoolean} from 'ahooks';
import {Button, Space} from 'antd';
import Cascader from '@/components/Cascader';
import Modal from '@/components/Modal';
import Select from '@/components/Select';


const SetSelectOrCascader = ({disabled, component, title, cascader, width, api, ...props}) => {


  const ref = useRef();

  const [state, {setTrue, setFalse}] = useBoolean();

  return (
    <Space>
      {cascader ?
        <Cascader resh={state} disabled={disabled} width={width} api={api} {...props} />
        :
        <Select resh={state} disabled={disabled} width={width} api={api} {...props} />}
      <Button onClick={() => {
        ref.current.open(false);
        setFalse();
      }}>{title || '设置分类'}</Button>
      <Modal width={800} component={component} ref={ref} onClose={() => {
        ref.current.close();
        setTrue();
      }} />
    </Space>);
};

export default SetSelectOrCascader;
