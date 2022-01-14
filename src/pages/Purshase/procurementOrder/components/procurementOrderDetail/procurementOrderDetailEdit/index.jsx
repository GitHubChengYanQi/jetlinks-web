/**
 * 编辑页
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {procurementOrderDetailDetail, procurementOrderDetailAdd, procurementOrderDetailEdit} from '../procurementOrderDetailUrl';
import * as SysField from '../procurementOrderDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: procurementOrderDetailDetail,
  add: procurementOrderDetailAdd,
  save: procurementOrderDetailEdit
};

const ProcurementOrderDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="orderDetailId"
    >
      <FormItem label="" name="skuId" component={SysField.SkuId} required/>
      <FormItem label="品牌id" name="brandId" component={SysField.BrandId} required/>
      <FormItem label="供应商id" name="customerId" component={SysField.CustomerId} required/>
      <FormItem label="数量" name="number" component={SysField.Number} required/>
      <FormItem label="采购单id" name="procurementOrderId" component={SysField.ProcurementOrderId} required/>
      <FormItem label="删除状态" name="display" component={SysField.Display} required/>
      <FormItem label="" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default ProcurementOrderDetailEdit;
