/**
 * 订单表编辑页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {orderDetail, orderAdd, orderEdit} from '../orderUrl';
import * as SysField from '../orderField';

const {FormItem} = Form;

const ApiConfig = {
  view: orderDetail,
  add: orderAdd,
  save: orderEdit
};

const OrderEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >
      <FormItem label="订单编号" name="orderId" component={SysField.OrderId} required/>
      <FormItem label="订单人姓名" name="name" component={SysField.Name} required/>
      <FormItem label="订单地址" name="adressId" component={SysField.AdressId} required/>
      <FormItem label="订单数量" name="numbers" component={SysField.Numbers} required/>
      <FormItem label="订单状态" name="state" component={SysField.State} required/>
      <FormItem label="联系电话" name="phone" component={SysField.Phone} required/>
      <FormItem label="订单时间" name="orderTime" component={SysField.OrderTime} required/>
      <FormItem label="付款时间" name="payTime" component={SysField.PayTime} required/>
      <FormItem label="发货时间" name="deliveryTime" component={SysField.DeliveryTime} required/>
      <FormItem label="订单总金额" name="total" component={SysField.Total} required/>
    </Form>
  );
};

export default OrderEdit;
