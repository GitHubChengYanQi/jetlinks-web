/**
 * 入库表编辑页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {instockDetail, instockAdd, instockEdit} from '../InstockUrl';
import * as SysField from '../InstockField';

const {FormItem} = Form;

const ApiConfig = {
  view: instockDetail,
  add: instockAdd,
  save: instockEdit
};

const InstockEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding:16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="instockId"
      >
        <FormItem label="仓库名称" name="storeHouseId" component={SysField.StoreHouseSelect} required />
        <FormItem label="产品名称" name="itemId" component={SysField.ItemIdSelect} required />
        <FormItem label="登记时间" name="registerTime" component={SysField.RegisterTime} required />
        <FormItem label="入库数量" name="number" component={SysField.Number} required />
        <FormItem label="原价" name="costPrice" component={SysField.CostPrice} required />
        <FormItem label="售价" name="sellingPrice" component={SysField.SellingPrice} required />
        <FormItem label="品牌" name="brandId" component={SysField.BrandId} required />
      </Form>
    </div>
  );
};

export default InstockEdit;
