/**
 * 订单表编辑页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef} from 'react';

import Form from '@/components/Form';
import {orderDetail, orderAdd, orderEdit} from '../OrderUrl';
import * as SysField from '../OrderField';


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
      <FormItem label="订单人姓名" name="name" component={SysField.ContactsId} required/>
      <FormItem label="订单地址" name="adressId" component={SysField.AdressId} required/>
      <FormItem label="订单数量" name="numbers" component={SysField.Number} required/>
      <FormItem label="订单状态" name="state" component={SysField.State} required/>
      <FormItem label="联系电话" name="clientId" component={SysField.ClientId} required/>
      <FormItem label="订单时间" name="orderTime" component={SysField.OrderTime} required/>
      <FormItem label="付款时间" name="payTime" component={SysField.PayTime} required/>
      <FormItem label="发货时间" name="deliveryTime" component={SysField.DeliveryId} required/>
      <FormItem label="产品名称" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="金额" name="stock_item_id" component={SysField.StockItemId} required/>


    </Form>
  );
};

export default OrderEdit;
