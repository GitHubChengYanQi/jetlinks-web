/**
 * 采购计划单子表整合数据后的子表编辑页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {procurementPlanDetalDetail, procurementPlanDetalAdd, procurementPlanDetalEdit} from '../procurementPlanDetalUrl';
import * as SysField from '../procurementPlanDetalField';

const {FormItem} = Form;

const ApiConfig = {
  view: procurementPlanDetalDetail,
  add: procurementPlanDetalAdd,
  save: procurementPlanDetalEdit
};

const ProcurementPlanDetalEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="detailId"
    >
      <FormItem label="" name="planId" component={SysField.PlanId} required/>
      <FormItem label="" name="skuId" component={SysField.SkuId} required/>
      <FormItem label="数量" name="total" component={SysField.Total} required/>
      <FormItem label="删除状态" name="display" component={SysField.Display} required/>
    </Form>
  );
};

export default ProcurementPlanDetalEdit;
