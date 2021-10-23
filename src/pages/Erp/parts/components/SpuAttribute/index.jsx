import React, {useEffect, useRef} from 'react';
import {Button} from 'antd';
import Modal from '@/components/Modal';
import Attribute from '@/pages/Erp/parts/components/Attribute';


const SpuAttribute = ({onChange,select,value,attribute,...props}) => {


  useEffect(() => {
    onChange(null);
  }, [select]);

  useEffect(() => {
    onChange((value && typeof value === 'string') ? JSON.parse(value) : value);
  }, []);

  const ref = useRef();

  return (<>
    {value && typeof value === 'object' && value.map((items, index) => {
      if (index === value.length - 1) {
        return `${items.values.attributeValues}`;
      } else {
        return `${items.values.attributeValues}，`;
      }
    })}
    <Button type="link" onClick={() => {
      ref.current.open(false);
    }}>{value ? '重新选择规格' : '选择规格'}</Button>
    <Modal
      ref={ref}
      component={Attribute}
      attribute={attribute}
      headTitle="选择规格"
      onChange={(value) => {
        onChange(value);
      }}
      attributes={(value && typeof value === 'string') ? JSON.parse(value) : value}
      footer={
        <>
          <Button type="primary" onClick={() => {
            ref.current.close();
          }}>保存</Button>
        </>
      } />
  </>);
};

export default SpuAttribute;
