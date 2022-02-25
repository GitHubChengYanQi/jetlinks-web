import React, {useRef} from 'react';
import {useBoolean} from 'ahooks';
import {Button, Space} from 'antd';
import Cascader from '@/components/Cascader';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import TreeSelect from '@/components/TreeSelect';


const SetSelectOrCascader = ({disabled,options, component, title, moduleType, width, api, ...props}) => {

  const ref = useRef();

  const [state, {setTrue, setFalse}] = useBoolean();

  const getModule = () => {
    switch (moduleType) {
      case 'cascader':
        return <Cascader resh={state} options={options} disabled={disabled} width={width} api={api} {...props} />;
      case 'tree':
        return <TreeSelect disabled={disabled} options={options} resh={state} width={width} api={api}  {...props} />;
      default:
        return <Select resh={state} options={options} disabled={disabled} width={width} api={api} {...props} />;
    }
  };

  return (
    <Space>
      {getModule()}
      <Button onClick={() => {
        ref.current.open(false);
        setFalse();
      }}>{title || '设置分类'}</Button>
      <Modal width={800} {...props} component={component} ref={ref} onClose={() => {
        ref.current.close();
        setTrue();
      }} onSuccess={()=>{
        ref.current.close();
        setTrue();
      }} />
    </Space>);
};

export default SetSelectOrCascader;
