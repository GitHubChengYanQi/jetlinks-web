/**
 * 物流表编辑页
 *
 * @author 
 * @Date 2021-07-15 17:41:40
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {logisticsDetail, logisticsAdd, logisticsEdit} from '../logisticsUrl';
import * as SysField from '../logisticsField';

const {FormItem} = Form;

const ApiConfig = {
  view: logisticsDetail,
  add: logisticsAdd,
  save: logisticsEdit
};

const LogisticsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="logisticsId"
    >
      <FormItem label="发货编号" name="orderId" component={SysField.OrderId} required/>
      <FormItem label="到货地址" name="clientId" component={SysField.ClientId} required/>
      <FormItem label="当前位置" name="position" component={SysField.Position} required/>
      <FormItem label="到货地址" name="adress" component={SysField.Adress} required/>
      <FormItem label="物流电话" name="phone" component={SysField.Phone} required/>
    </Form>
  );
};

export default LogisticsEdit;
