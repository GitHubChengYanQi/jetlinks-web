/**
 * 仓库物品明细表编辑页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {stockDetailsDetail, stockDetailsAdd, stockDetailsEdit, stockDetailsList} from '../StockDetailsUrl';
import * as SysField from '../StockDetailsField';

const {FormItem} = Form;

const ApiConfig = {
  view: stockDetailsDetail,
  add: stockDetailsAdd,
  save: stockDetailsEdit,
};

const StockDetailsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="stockItemId"
    >
      <FormItem label="库存编号" name="stockId" component={SysField.Stock} required/>
      <FormItem label="价格" name="price" component={SysField.Price} required/>
      <FormItem label="入库时间" name="storageTime" component={SysField.StorageTime} required/>
    </Form>
  );
};

export default StockDetailsEdit;
