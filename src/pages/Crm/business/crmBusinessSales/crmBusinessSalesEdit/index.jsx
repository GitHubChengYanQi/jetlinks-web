/**
 * 销售编辑页
 *
 * @author
 * @Date 2021-08-02 15:47:16
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {crmBusinessSalesDetail, crmBusinessSalesAdd, crmBusinessSalesEdit} from '../crmBusinessSalesUrl';
import * as SysField from '../crmBusinessSalesField';

const {FormItem} = Form;

const ApiConfig = {
  view: crmBusinessSalesDetail,
  add: crmBusinessSalesAdd,
  save: crmBusinessSalesEdit
};

const CrmBusinessSalesEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="salesId"
    >
      <FormItem label="名称" name="name" component={SysField.Name} required/>
      <FormItem label="备注" name="note" component={SysField.Note} />
    </Form>
  );
};

export default CrmBusinessSalesEdit;
