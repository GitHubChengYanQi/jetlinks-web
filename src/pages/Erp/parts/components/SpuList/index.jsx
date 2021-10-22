import * as SysField from '@/pages/Erp/parts/PartsField';
import React, {useEffect, useState} from 'react';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';

const {FormItem} = Form;

const SpuList = ({index}) => {

  const [attribute, setAttribute] = useState();

  const [select, setSelect] = useState();

  const {run} = useRequest(spuDetail, {
    manual: true, onSuccess: (res) => {
      setAttribute(res.categoryRequests);
    }
  });

  return (
    <>
      <FormItem
        label="物料名称"
        name={`parts.${index}.spuId`}
        component={SysField.SpuId}
        select={(value)=>{
          setSelect(value);
        }}
        spuId={(value) => {
          run({
            data: {
              spuId: value
            }
          });
        }}
        required
      />
      <FormItem
        label="规格描述"
        name={`parts.${index}.partsAttributes`}
        categoryRequests={attribute || []}
        select={select}
        component={SysField.Remake}
      />
      <FormItem
        label="数量"
        name={`parts.${index}.number`}
        component={SysField.Number}
        required
      />
      <FormItem
        label="备注"
        name={`parts.${index}.note`}
        component={SysField.Name}
        required
      />
    </>
  );
};

export default SpuList;
