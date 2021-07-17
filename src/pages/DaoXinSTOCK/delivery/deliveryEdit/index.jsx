/**
 * 出库表编辑页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
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
      <FormItem label="库存编号" name="stockId" component={SysField.Stock} required/>
      <FormItem label="出库时间" name="deliveryTime" component={SysField.DeliveryTime} required/>
      <FormItem label="出库数量" name="number" component={SysField.Number} required/>
      <FormItem label="出库价格" name="price" component={SysField.Price} required/>
      <FormItem label="出库品牌" name="brand" component={SysField.Brand} required/>
    </Form>
  );
};

export default DeliveryEdit;
