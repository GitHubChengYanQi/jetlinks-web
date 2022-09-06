import React from 'react';
import Group from '../../../index';

interface Props {
  onChange?: (key: string) => void;
  value?: string;
}

const SelectTopClass: React.FC<Props> = (props) => {

  const {
    value,
    onChange = () => {
    }
  } = props;

  return <div style={{border:'1px solid #d9d9d9',padding:8}}>
    <Group value={value} onChange={onChange} noAction />
  </div>;
};

export default SelectTopClass;
