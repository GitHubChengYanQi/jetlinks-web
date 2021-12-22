/**
 * 编辑页
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {procurementPlanBindDetail, procurementPlanBindAdd, procurementPlanBindEdit} from '../procurementPlanBindUrl';
import * as SysField from '../procurementPlanBindField';

const {FormItem} = Form;

const ApiConfig = {
  view: procurementPlanBindDetail,
  add: procurementPlanBindAdd,
  save: procurementPlanBindEdit
};

const ProcurementPlanBindEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="detailId"
    >
      <FormItem label="采购计划id" name="procurementPlanId" component={SysField.ProcurementPlanId} required/>
      <FormItem label="申请单id" name="askId" component={SysField.AskId} required/>
      <FormItem label="申请单绑定详情id" name="askDetailId" component={SysField.AskDetailId} required/>
      <FormItem label="删除状态" name="display" component={SysField.Display} required/>
    </Form>
  );
};

export default ProcurementPlanBindEdit;
