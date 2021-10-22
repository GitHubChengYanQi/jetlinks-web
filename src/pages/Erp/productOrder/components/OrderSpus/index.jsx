import React, {useEffect, useState} from 'react';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import * as SysField from '../../productOrderField';
import {skuList} from '@/pages/Erp/sku/skuUrl';

const {FormItem} = Form;

const OrderSpus = ({index}) => {

  const [attribute, setAttribute] = useState([]);

  const {run} = useRequest(skuList, {
    manual: true, onSuccess: (res) => {
      setAttribute(res);
    }
  });

  return (
    <>
      <div style={{display:'inline-block',width:'30%'}}>
        <FormItem
          label="商品名称"
          name={`parts.${index}.spuId`}
          component={SysField.SpuId}
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
          name={`parts.${index}.skuId`}
          component={SysField.SkuId}
        />
      </div>
      <div style={{display:'inline-block',width:'18%'}}>
        <FormItem
          label="数量"
          name={`parts.${index}.number`}
          component={SysField.Number}
          required
        />
      </div>
      <div style={{display:'inline-block',width:'18%'}}>
        <FormItem
          label="金额"
          name={`parts.${index}.money`}
          component={SysField.Money}
          required
        />
      </div>
    </>
  );
};

export default OrderSpus;
