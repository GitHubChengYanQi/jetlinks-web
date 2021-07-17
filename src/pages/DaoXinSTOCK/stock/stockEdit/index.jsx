/**
 * 仓库总表编辑页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */


import React, {useRef, useState} from 'react';
import {Button, Input} from 'antd';
import Form from '@/components/Form';
import {stockDetail, stockAdd, stockEdit} from '../stockUrl';
import * as SysField from '../stockField';
import './index.scss';

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

      <FormItem label="仓库名称" name="palceId" component= {SysField.Palce}   required />
      <FormItem label="物品名称" name="itemId" component={SysField.Item} required/>
      <FormItem label="品牌" name="brandId" component={SysField.BrandId} required/>
      <FormItem label="数量" name="inventory" component={SysField.Inventory} required/>
    </Form>
  );
};

export default StockEdit;
