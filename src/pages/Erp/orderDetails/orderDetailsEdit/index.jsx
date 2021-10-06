/**
 * 货单明细表编辑页
 *
 * @author siqiang
 * @Date 2021-08-18 13:26:29
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {orderDetailsDetail, orderDetailsAdd, orderDetailsEdit} from '../orderDetailsUrl';
import * as SysField from '../orderDetailsField';

const {FormItem} = Form;

const ApiConfig = {
  view: orderDetailsDetail,
  add: orderDetailsAdd,
  save: orderDetailsEdit
};

const OrderDetailsEdit = ({...props}) => {

  const formRef = useRef();
  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >
      <FormItem style={{'display': 'none'}} name="orderId" component={SysField.OrderId} />
      <FormItem label="产品名称" name="itemId" component={SysField.itemId} required/>
      <FormItem label="数量" name="number" component={SysField.Number} required/>
      <FormItem label="价格" name="price" component={SysField.Price} required/>
    </Form>
  );
};

export default OrderDetailsEdit;
