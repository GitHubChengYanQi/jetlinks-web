/**
 * 销售流程编辑页
 *
 * @author 
 * @Date 2021-08-02 15:47:16
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {crmBusinessSalesProcessDetail, crmBusinessSalesProcessAdd, crmBusinessSalesProcessEdit} from '../crmBusinessSalesProcessUrl';
import * as SysField from '../crmBusinessSalesProcessField';

const {FormItem} = Form;

const ApiConfig = {
  view: crmBusinessSalesProcessDetail,
  add: crmBusinessSalesProcessAdd,
  save: crmBusinessSalesProcessEdit
};

const CrmBusinessSalesProcessEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="salesProcessId"
    >
      <FormItem label="流程名称" name="name" component={SysField.Name} required/>
      <FormItem label="百分比" name="percentage" component={SysField.Percentage} required/>
      <FormItem label="流程id" name="salesId" component={SysField.SalesId} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
    </Form>
  );
};

export default CrmBusinessSalesProcessEdit;
