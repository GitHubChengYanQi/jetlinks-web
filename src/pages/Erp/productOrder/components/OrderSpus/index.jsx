import React, {useEffect, useState} from 'react';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import * as SysField from '../../productOrderField';
import {skuList} from '@/pages/Erp/sku/skuUrl';
import {useSafeState} from 'ahooks';

const {FormItem} = Form;

const OrderSpus = ({index}) => {

  const [select,setSelect] = useSafeState();
  const [data,setData] = useSafeState();

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
            setData(value);
          }}
          required
        />
      </div>
      <div style={{display:'inline-block',width:'30%'}}>
        <FormItem
          label="规格描述"
          name={`orderDetail.${index}.sku`}
          attribute={data || []}
          select={select}
          component={SysField.SkuId}
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
