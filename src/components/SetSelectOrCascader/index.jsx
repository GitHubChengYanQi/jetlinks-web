import React, {useRef} from 'react';
import {useBoolean} from 'ahooks';
import {Button, Space} from 'antd';
import Cascader from '@/components/Cascader';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import TreeSelect from '@/components/TreeSelect';


const SetSelectOrCascader = ({disabled, options, component, title, moduleType, width, api, tableTitle, ...props}) => {

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
      }}>{title || '新增分类'}</Button>
      <Modal width={800} tableTitle={<strong style={{
        fontWeight: 500,
        fontSize: 16
      }}>{tableTitle}</strong>} {...props} component={component} ref={ref} onClose={() => {
        ref.current.close();
        setTrue();
      }} onSuccess={() => {
        ref.current.close();
        setTrue();
      }} />
    </Space>);
};

export default SetSelectOrCascader;
