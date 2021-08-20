/**
 * 发货表编辑页
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {deliveryDetail, deliveryAdd, deliveryEdit} from '../deliveryUrl';
import * as SysField from '../deliveryField';

const {FormItem} = Form;

const ApiConfig = {
  view: deliveryDetail,
  add: deliveryAdd,
  save: deliveryEdit
};

const DeliveryEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="deliveryId"
    >
      <FormItem label="出库单id" name="outstockOrderId" component={SysField.OutstockOrderId} required/>
      <FormItem label="发货时间" name="outTime" component={SysField.OutTime} required/>
    </Form>
  );
};

export default DeliveryEdit;
