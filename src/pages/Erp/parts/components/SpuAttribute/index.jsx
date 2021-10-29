import React, {useEffect, useRef} from 'react';
import {Button} from 'antd';
import Modal from '@/components/Modal';
import Attribute from '@/pages/Erp/parts/components/Attribute';


const SpuAttribute = ({onChange, select, value, sku, ...props}) => {

  useEffect(() => {
    onChange(null);
  }, [select]);

  useEffect(() => {
    onChange((value && typeof value === 'string') ? JSON.parse(value) : value);
  }, []);

  const ref = useRef();

  return (<>
    <Button type="link" onClick={() => {
      ref.current.open(false);
    }}>{value ? (value && typeof value === 'object' &&
      value.map((items, index) => {
        if (index === value.length - 1) {
          return `${items.values.name}`;
        } else {
          return `${items.values.name}，`;
        }
      })) : '选择规格'}</Button>
    <Modal
      ref={ref}
      component={Attribute}
      sku={sku}
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
