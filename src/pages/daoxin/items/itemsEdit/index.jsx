/**
 * 物品表编辑页
 *
 * @author 
 * @Date 2021-07-14 14:04:26
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {itemsDetail, itemsAdd, itemsEdit} from '../itemsUrl';
import * as SysField from '../itemsField';

const {FormItem} = Form;

const ApiConfig = {
  view: itemsDetail,
  add: itemsAdd,
  save: itemsEdit
};

const ItemsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="itemId"
    >
      <FormItem label="物品名字" name="name" component={SysField.Name} required/>
      <FormItem label="质保期" name="shelfLife" component={SysField.ShelfLife} required/>
      <FormItem label="物品库存" name="inventory" component={SysField.Inventory} required/>
      <FormItem label="生产日期" name="productionTime" component={SysField.ProductionTime} required/>
      <FormItem label="重要程度" name="important" component={SysField.Important} required/>
      <FormItem label="物品重量" name="weight" component={SysField.Weight} required/>
      <FormItem label="材质id" name="materialId" component={SysField.MaterialId} required/>
      <FormItem label="成本" name="cost" component={SysField.Cost} required/>
      <FormItem label="易损" name="vulnerability" component={SysField.Vulnerability} required/>
    </Form>
  );
};

export default ItemsEdit;
