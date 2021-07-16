/**
 * 发货表编辑页
 *
 * @author 
 * @Date 2021-07-15 17:41:40
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
      fieldKey="orderId"
    >
      <FormItem label="出库编号" name="outboundId" component={SysField.OutboundId} required/>
      <FormItem label="发货人" name="consignor" component={SysField.Consignor} required/>
      <FormItem label="收货人" name="clientId" component={SysField.ClientId} required/>
      <FormItem label="收货地址" name="shipping" component={SysField.Shipping} required/>
      <FormItem label="发货时间" name="outtime" component={SysField.Outtime} required/>
      <FormItem label="发货价格" name="price" component={SysField.Price} required/>
      <FormItem label="物品重量" name="weight" component={SysField.Weight} required/>
      <FormItem label="物品面积" name="area" component={SysField.Area} required/>
    </Form>
  );
};

export default OrderEdit;
