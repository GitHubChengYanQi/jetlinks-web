/**
 * 库位绑定物料表编辑页
 *
 * @author song
 * @Date 2022-01-20 11:15:05
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {
  storehousePositionsBindDetail,
  storehousePositionsBindAdd,
  storehousePositionsBindEdit,
} from '../storehousePositionsBindUrl';
import * as SysField from '../storehousePositionsBindField';

const {FormItem} = Form;

const ApiConfig = {
  view: storehousePositionsBindDetail,
  add: storehousePositionsBindAdd,
  save: storehousePositionsBindEdit
};

const StorehousePositionsBindEdit = ({...props}) => {

  const {positionId,...other} = props;

  const formRef = useRef();

  return (
    <Form
      {...other}
      ref={formRef}
      api={ApiConfig}
      fieldKey="bindId"
      onSubmit={(value)=>{
        return {...value,spuId:value.skuId,positionId};
      }}
    >
      <FormItem label="物料型号" name="skuId" component={SysField.SpuId} required/>
    </Form>
  );
};

export default StorehousePositionsBindEdit;
