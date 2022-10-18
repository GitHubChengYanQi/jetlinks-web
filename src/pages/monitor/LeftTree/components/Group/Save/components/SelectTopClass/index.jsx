import React from 'react';
import Group from '../../../index';


const SelectTopClass = ({
  value,
  onChange = () => {
  },
  checkable,
}) => {


  return <div style={{border: '1px solid #d9d9d9', padding: 8,maxHeight: '50vh', overflow: 'auto'}}>
    <Group checkable={checkable} value={value} onChange={onChange} />
  </div>;
};

export default SelectTopClass;
