/**
 * 库位绑定物料表编辑页
 *
 * @author song
 * @Date 2022-01-20 11:15:05
 */

import React, {useEffect, useRef} from 'react';
import Form from '@/components/Form';
import {
  storehousePositionsBindDetail,
  storehousePositionsBindAdd,
  storehousePositionsBindEdit,
  storehousePositionsBindSpuAddBind
} from '../storehousePositionsBindUrl';
import * as SysField from '../storehousePositionsBindField';
import {useRequest} from '@/util/Request';
import {storehousePositionsDetail} from '@/pages/Erp/storehouse/components/storehousePositions/storehousePositionsUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: storehousePositionsBindDetail,
  add: storehousePositionsBindSpuAddBind,
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
        return {...value,positionId};
      }}
    >
      <FormItem label="物料型号" name="spuId" component={SysField.SpuId} spu required/>
    </Form>
  );
};

export default StorehousePositionsBindEdit;
