/**
 * 出库表编辑页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {outstockDetail, outstockAdd, outstockEdit} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import {Storehouse} from '../OutstockField';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockDetail,
  add: outstockAdd,
  save: outstockEdit
};

const OutstockEdit = ({...props}) => {
  const formRef = useRef();

  const [value, setValue] = useState(props.value);


  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outstockId"
    >
      <FormItem label="选择库存" name="stockId" component={SysField.StockId} onchange={(value) => {
        setValue(value);
      }} required />
      <FormItem label="出库数量" name="number" component={SysField.Number} required />
      <FormItem label="仓库id" name="storehouseId" component={SysField.Storehouse} val={value || null} required />
      <FormItem label="产品id" name="itemId" component={SysField.Items} val={value || null} required />
      <FormItem label="品牌id" name="brandId" component={SysField.Brand} val={value || null} required />
      <div style={{height: 0}}>
        <FormItem
          hidden
          name="outstockOrderId"
          component={SysField.OutstockOrderId}
          val={props.outstockOrderId || null}
          required />
      </div>
    </Form>
  );
};

export default OutstockEdit;
