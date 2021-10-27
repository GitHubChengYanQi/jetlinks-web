import * as SysField from '@/pages/Erp/parts/PartsField';
import React from 'react';
import Form from '@/components/Form';

const {FormItem} = Form;

const SpuList = ({index}) => {

  return (
    <>
      <FormItem
        labelCol={7}
        label="物料名称"
        name={`parts.${index}.spuId`}
        component={SysField.SpuId}
        required
      />
      <FormItem
        labelCol={7}
        label="规格描述"
        name={`parts.${index}.partsAttributes`}
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
