/**
 * 供应商供应物料编辑页
 *
 * @author song
 * @Date 2021-12-20 10:08:44
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {supplyDetail, supplyAdd, supplyEdit} from '../supplyUrl';
import * as SysField from '../supplyField';

const {FormItem} = Form;

const ApiConfig = {
  view: supplyDetail,
  add: supplyAdd,
  save: supplyEdit
};

const SupplyEdit = ({...props}) => {

  const {customerId,...other} = props;

  const formRef = useRef();

  return (
    <Form
      {...other}
      ref={formRef}
      api={ApiConfig}
      fieldKey="supplyId"
      onSubmit={(value)=>{
        return {...value,customerId};
      }}
    >
      <FormItem label="物料" name="skuId" component={SysField.SkuId} customerId={customerId} required/>
    </Form>
  );
};

export default SupplyEdit;
