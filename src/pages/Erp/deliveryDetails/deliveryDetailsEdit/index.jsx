/**
 * 编辑页
 *
 * @author  
 * @Date 2021-08-20 13:14:51
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {deliveryDetailsDetail, deliveryDetailsAdd, deliveryDetailsEdit} from '../deliveryDetailsUrl';
import * as SysField from '../deliveryDetailsField';

const {FormItem} = Form;

const ApiConfig = {
  view: deliveryDetailsDetail,
  add: deliveryDetailsAdd,
  save: deliveryDetailsEdit
};

const DeliveryDetailsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="deliveryDetailsId"
    >
      <FormItem label="产品id" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="客户id" name="customerId" component={SysField.CustomerId} required/>
      <FormItem label="地址id" name="adressId" component={SysField.AdressId} required/>
      <FormItem label="联系人id" name="contactsId" component={SysField.ContactsId} required/>
      <FormItem label="电话id" name="phoneId" component={SysField.PhoneId} required/>
      <FormItem label="出库明细id" name="stockItemId" component={SysField.StockItemId} required/>
      <FormItem label="出库单" name="deliveryId" component={SysField.DeliveryId} required/>
    </Form>
  );
};

export default DeliveryDetailsEdit;
