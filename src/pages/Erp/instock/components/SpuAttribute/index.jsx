import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'antd';
import Modal from '@/components/Modal';
import Attribute from '@/pages/Erp/instock/components/Attribute';


const SpuAttribute = ({onChange, skuId, select, value, sku, ...props}) => {
  console.log(value);

  const [val, setVal] = useState();

  useEffect(() => {
    if (select) {
      onChange(null);
    }
  }, [select]);

  useEffect(() => {
    setVal((val && typeof val === 'string') ? JSON.parse(val) : val);
  }, []);

  const ref = useRef();

  return (<>
    <Button type="link" onClick={() => {
      ref.current.open(false);
    }}>{val ? (val && typeof val === 'object' &&
      val.map((items, index) => {
        if (index === val.length - 1) {
          return `${items.values.name}`;
        } else {
          return `${items.values.name}，`;
        }
      })) : '选择规格'}</Button>
    <Modal
      ref={ref}
      component={Attribute}
      sku={sku}
      skuId={(value) => {
        if (value) {
          typeof skuId === 'function' && skuId(value);
        }
      }}
      headTitle="选择规格"
      onChange={(value) => {
        if (value && value.length > 0) {
          onChange(value[0].id);
        }
      }}
      skus={(value) => {
        setVal(value);
      }}
      attributes={(val && typeof val === 'string') ? JSON.parse(val) : val}
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
