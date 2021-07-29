/**
 * 出库表编辑页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {deliveryDetail, deliveryAdd, deliveryEdit, outstockDetail, outstockAdd, outstockEdit} from '../OutstockUrl';
import * as SysField from '../OutstockField';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockDetail,
  add: outstockAdd,
  save: outstockEdit
};

const OutstockEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outstockId"
    >
      <FormItem label="库存编号" name="stockId" component={SysField.Stock} required/>
      <FormItem label="出库时间" name="deliveryTime" component={SysField.DeliveryTime} required/>
      <FormItem label="出库数量" name="number" component={SysField.Number} required/>
      <FormItem label="出库价格" name="price" component={SysField.Price} required/>
      <FormItem label="出库品牌" name="brand" component={SysField.Brand} required/>
    </Form>
  );
};

export default OutstockEdit;
