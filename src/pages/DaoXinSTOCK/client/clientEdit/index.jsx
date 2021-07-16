/**
 * 客户表编辑页
 *
 * @author 
 * @Date 2021-07-15 17:41:40
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {clientDetail, clientAdd, clientEdit} from '../clientUrl';
import * as SysField from '../clientField';

const {FormItem} = Form;

const ApiConfig = {
  view: clientDetail,
  add: clientAdd,
  save: clientEdit
};

const ClientEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="clientId"
    >
      <FormItem label="姓名" name="name" component={SysField.Name} required/>
      <FormItem label="居住地址" name="adress" component={SysField.Adress} required/>
      <FormItem label="联系电话" name="phone" component={SysField.Phone} required/>
      <FormItem label="订单号" name="orderId" component={SysField.OrderId} required/>
      <FormItem label="下单时间" name="orderTime" component={SysField.OrderTime} required/>
      <FormItem label="价格" name="price" component={SysField.Price} required/>
      <FormItem label="物流id" name="logisticsId" component={SysField.LogisticsId} required/>
    </Form>
  );
};

export default ClientEdit;
