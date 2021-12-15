/**
 * 采购清单编辑页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {purchaseListingDetail, purchaseListingAdd, purchaseListingEdit} from '../purchaseListingUrl';
import * as SysField from '../purchaseListingField';

const {FormItem} = Form;

const ApiConfig = {
  view: purchaseListingDetail,
  add: purchaseListingAdd,
  save: purchaseListingEdit
};

const PurchaseListingEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="purchaseListingId"
    >
      <FormItem label="采购申请id" name="purchaseAskId" component={SysField.PurchaseAskId} required/>
      <FormItem label="" name="skuId" component={SysField.SkuId} required/>
      <FormItem label="申请数量" name="applyNumber" component={SysField.ApplyNumber} required/>
      <FormItem label="可用数量" name="availableNumber" component={SysField.AvailableNumber} required/>
      <FormItem label="交付日期" name="deliveryDate" component={SysField.DeliveryDate} required/>
      <FormItem label="备注" name="note" component={SysField.Note} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="创建用户" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改用户" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default PurchaseListingEdit;
