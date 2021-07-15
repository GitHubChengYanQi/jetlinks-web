/**
 * 仓库总表编辑页
 *
 * @author 
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {stockDetail, stockAdd, stockEdit} from '../stockUrl';
import * as SysField from '../stockField';

const {FormItem} = Form;

const ApiConfig = {
  view: stockDetail,
  add: stockAdd,
  save: stockEdit
};

const StockEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="stockId"
    >
      <FormItem label="地点id" name="palceId" component={SysField.PalceId} required/>
      <FormItem label="物品id" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="品牌id" name="brandId" component={SysField.BrandId} required/>
      <FormItem label="数量" name="inventory" component={SysField.Inventory} required/>
    </Form>
  );
};

export default StockEdit;
