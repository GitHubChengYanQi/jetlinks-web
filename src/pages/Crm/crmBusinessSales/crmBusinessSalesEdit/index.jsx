/**
 * 销售编辑页
 *
 * @author 
 * @Date 2021-07-31 13:28:44
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
    </Form>
  );
};

export default CrmBusinessSalesEdit;
