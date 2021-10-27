import * as SysField from '@/pages/Erp/parts/PartsField';
import React, {useEffect, useState} from 'react';
import Form from '@/components/Form';
import {useReactive, useSafeState} from 'ahooks';

const {FormItem} = Form;


const SpuList = ({index}) => {

  const [select,setSelect] = useSafeState();
  const [data,setData] = useSafeState();
  console.log(select,data);


  return (
    <>
      <FormItem
        labelCol={7}
        label="物料名称"
        name={`parts.${index}.spuId`}
        component={SysField.SpuId}
        select={(value)=>{
          setSelect(value);
        }}
        data={(value) => {
          setData(value);
        }}
        required
      />
      <FormItem
        labelCol={7}
        label="规格描述"
        name={`parts.${index}.partsAttributes`}
        attribute={data || []}
        select={select}
        component={SysField.Remake}
      />
      <FormItem
        labelCol={7}
        label="数量"
        name={`parts.${index}.number`}
        component={SysField.Number}
        required
      />
      <FormItem
        labelCol={7}
        label="备注"
        name={`parts.${index}.note`}
        component={SysField.Name}
      />
    </>
  );
};

export default SpuList;
