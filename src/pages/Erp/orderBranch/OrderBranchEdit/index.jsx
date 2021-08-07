/**
 * 订单分表编辑页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {orderBranchDetail, orderBranchAdd, orderBranchEdit} from '../OrderBranchUrl';
import * as SysField from '../OrderBranchField';

const {FormItem} = Form;

const ApiConfig = {
  view: orderBranchDetail,
  add: orderBranchAdd,
  save: orderBranchEdit
};

const OrderBranchEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >

      <FormItem label="产品id" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="产品名称" name="name" component={SysField.Name} required/>
      <FormItem label="产品单价" name="price" component={SysField.Price} required/>
    </Form>
  );
};

export default OrderBranchEdit;
