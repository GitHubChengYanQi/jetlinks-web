import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'antd';
import Modal from '@/components/Modal';
import Attribute from '@/pages/Erp/instock/components/Attribute';
import {useRequest} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';


const SpuAttribute = ({onChange, skuId, select, value, sku, ...props}) => {

  const {data, run} = useRequest(skuDetail, {manual: true});

  const attributes = data && data.list.map((items)=>{
    return {
      attribute:{
        k:items.attributeName,
        k_s:items.attributeId,
      },
      values:{
        id:items.attributeValuesId,
        name:items.attributeValues,
      }
    };
  });

  useEffect(() => {
    if (select) {
      onChange(null);
    }
  }, [select]);

  useEffect(() => {
    if (value) {
      run({
        data: {
          skuId: value,
        }
      });
    }
  }, []);

  const ref = useRef();
  const comRef = useRef();

  return (<>
    <Button type="link" onClick={() => {
      ref.current.open(false);
    }}>
      {
        value
        &&
        data
          ?
          data.list.map((items, index) => {
            if (index === data.list.length - 1) {
              return `${items.attributeValues}`;
            } else {
              return `${items.attributeValues}，`;
            }
          })
          :
          '选择规格'
      }
    </Button>
    <Modal
      ref={ref}
      component={Attribute}
      compoentRef={comRef}
      sku={sku}
      skuId={(value) => {
        if (value) {
          typeof skuId === 'function' && skuId(value);
        }
      }}
      headTitle="选择规格"
      onChange={async (value) => {
        await run({
          data: {
            skuId: value,
          }
        });
        onChange(value);
      }}
      attributes={attributes}
      footer={
        <>
          <Button type="primary" onClick={() => {
            ref.current.close();
            comRef.current.onchange();
          }}>保存</Button>
        </>
      } />
  </>);
};

export default SpuAttribute;
