import React from 'react';
import Terminal from '@/pages/monitor/LeftTree/components/Terminal';

const SelectTopClass = (props) => {

  const {
    value,
    onChange = () => {
    },
    onGetNode = () => {
    }
  } = props;

  return <div style={{border: '1px solid #d9d9d9', padding: 8, maxHeight: '50vh', overflow: 'auto'}}>
    <Terminal value={value} onChange={onChange} noAction onGetNode={onGetNode} />
  </div>;
};

export default SelectTopClass;
