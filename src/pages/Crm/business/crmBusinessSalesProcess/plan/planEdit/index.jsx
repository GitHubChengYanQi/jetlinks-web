/**
 * 编辑页
 *
 * @author song
 * @Date 2021-09-14 14:36:34
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {planDetail, planAdd, planEdit} from '../planUrl';
import * as SysField from '../planField';
import {
  crmBusinessSalesProcessAdd,
  crmBusinessSalesProcessDetail,
  crmBusinessSalesProcessEdit
} from '@/pages/Crm/business/crmBusinessSalesProcess/crmBusinessSalesProcessUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: crmBusinessSalesProcessDetail,
  add: crmBusinessSalesProcessAdd,
  save: crmBusinessSalesProcessEdit
};

const PlanEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding:20}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="salesProcessId"
      >
        <FormItem name="plans" component={SysField.SalesProcessPlanId} />
      </Form>
    </div>
  );
};


export default PlanEdit;
