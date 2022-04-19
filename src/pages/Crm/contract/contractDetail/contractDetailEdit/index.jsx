/**
 * 合同产品明细编辑页
 *
 * @author sb
 * @Date 2021-09-18 15:29:24
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {contractDetailDetail, contractDetailAdd, contractDetailEdit} from '../contractDetailUrl';
import * as SysField from '../contractDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: contractDetailDetail,
  add: contractDetailAdd,
  save: contractDetailEdit
};

const ContractDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >
      <FormItem style={{'display': 'none'}} name="contractId" component={SysField.BusinessId} required />
      <FormItem style={{'display': 'none'}} name="itemId" component={SysField.ItemId} required />
      <FormItem label="销售单价" name="salePrice" component={SysField.salePrice} required />
      <FormItem label="数量" name="quantity" component={SysField.Quantity} required />
    </Form>
  );
};

export default ContractDetailEdit;
