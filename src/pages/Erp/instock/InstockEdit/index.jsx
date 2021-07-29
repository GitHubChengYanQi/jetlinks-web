/**
 * 入库表编辑页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
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
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="instockId"
    >
      <FormItem label="物品名称" name="itemId" component={SysField.Item} required/>
      <FormItem label="仓库名称" name="storehouseId" component={SysField.PlaceId} required/>
      <FormItem label="登记时间" name="registerTime" component={SysField.RegisterTime} required/>
      <FormItem label="入库数量" name="number" component={SysField.Number} required/>
      <FormItem label="价格" name="price" component={SysField.Price} required/>
      <FormItem label="品牌" name="brandId" component={SysField.BrandId} required/>
    </Form>
  );
};

export default InstockEdit;
