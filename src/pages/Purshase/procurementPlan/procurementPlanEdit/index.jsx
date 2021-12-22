/**
 * 采购计划主表编辑页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {procurementPlanDetail, procurementPlanAdd, procurementPlanEdit} from '../procurementPlanUrl';
import * as SysField from '../procurementPlanField';

const {FormItem} = Form;

const ApiConfig = {
  view: procurementPlanDetail,
  add: procurementPlanAdd,
  save: procurementPlanEdit
};

const ProcurementPlanEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="procurementPlanId"
    >
      <FormItem label="采购计划名称" name="procurementPlanName" component={SysField.ProcurementPlanName} required/>
      <FormItem label="负责人" name="userId" component={SysField.UserId} required/>
      <FormItem label="备注" name="remark" component={SysField.Remark} required/>
      <FormItem label="要求供应商等级" name="needLevel" component={SysField.NeedLevel} required/>
      <FormItem label="非供应商物料" name="isSpupplier" component={SysField.IsSpupplier} required/>
      <FormItem label="删除状态" name="display" component={SysField.Display} required/>
      <FormItem label="状态" name="status" component={SysField.Status} required/>
      <FormItem label="交付日期" name="deliveryDate" component={SysField.DeliveryDate} required/>
      <FormItem label="" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="" name="updateTime" component={SysField.UpdateTime} required/>
    </Form>
  );
};

export default ProcurementPlanEdit;
