import * as SysField from '@/pages/Erp/parts/PartsField';
import React, {useState} from 'react';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';

const {FormItem} = Form;


const SpuList = ({index}) => {

  const [select,setSelect] = useState();

  const {data,run} = useRequest(spuDetail, {
    manual: true
  });

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
        spuId={(value) => {
          if (value){
            run({
              data: {
                spuId: value
              }
            });
          }
        }}
        required
      />
      <FormItem
        labelCol={7}
        label="规格描述"
        name={`parts.${index}.partsAttributes`}
        attribute={data && data.attribute || []}
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
