/**
 * 采购单编辑页
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {procurementOrderDetail, procurementOrderAdd, procurementOrderEdit} from '../procurementOrderUrl';
import * as SysField from '../procurementOrderField';

const {FormItem} = Form;

const ApiConfig = {
  view: procurementOrderDetail,
  add: procurementOrderAdd,
  save: procurementOrderEdit
};

const ProcurementOrderEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="procurementOrderId"
    >
      <FormItem label="采购计划id" name="procurementPlanId" component={SysField.ProcurementPlanId} required/>
      <FormItem label="状态" name="status" component={SysField.Status} required/>
      <FormItem label="备注" name="note" component={SysField.Note} required/>
      <FormItem label="删除状态" name="display" component={SysField.Display} required/>
      <FormItem label="" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default ProcurementOrderEdit;
