/**
 * 销售流程编辑页
 *
 * @author 
 * @Date 2021-07-31 13:28:44
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
      <FormItem label="流程名称" name="name1" component={SysField.Name1} required/>
      <FormItem label="" name="name2" component={SysField.Name2} required/>
      <FormItem label="" name="name3" component={SysField.Name3} required/>
      <FormItem label="" name="name4" component={SysField.Name4} required/>
      <FormItem label="" name="name5" component={SysField.Name5} required/>
      <FormItem label="状态" name="state" component={SysField.State} required/>
    </Form>
  );
};

export default CrmBusinessSalesProcessEdit;
