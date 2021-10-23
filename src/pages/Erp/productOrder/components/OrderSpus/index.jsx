import React, {useEffect, useState} from 'react';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import * as SysField from '../../productOrderField';
import {skuList} from '@/pages/Erp/sku/skuUrl';

const {FormItem} = Form;

const OrderSpus = ({index}) => {

  const [attribute, setAttribute] = useState([]);
  const [select, setSelect] = useState();

  const {run} = useRequest(spuDetail, {
    manual: true, onSuccess: (res) => {
      if (res.attribute) {
        const attribute = JSON.parse(res.attribute);
        if (attribute){
          setAttribute(attribute);
        }
      }
    }
  });

  return (
    <>
      <div style={{display:'inline-block',width:'30%'}}>
        <FormItem
          label="商品名称"
          name={`orderDetail.${index}.spuId`}
          component={SysField.SpuId}
          select={(value)=>{
            setSelect(value);
          }}
          spuId={(value)=>{
            run({
              data:{
                spuId:value
              }
            });
          }}
          required
        />
      </div>
      <div style={{display:'inline-block',width:'30%'}}>
        <FormItem
          label="规格描述"
          attribute={attribute}
          name={`orderDetail.${index}.sku`}
          select={select}
          component={SysField.SkuId}
          required
        />
      </div>
      <div style={{display:'inline-block',width:'18%'}}>
        <FormItem
          label="数量"
          name={`orderDetail.${index}.number`}
          component={SysField.Number}
          required
        />
      </div>
      <div style={{display:'inline-block',width:'18%'}}>
        <FormItem
          label="金额"
          name={`orderDetail.${index}.money`}
          component={SysField.Money}
          required
        />
      </div>
    </>
  );
};

export default OrderSpus;
