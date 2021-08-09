/**
 * 客户级别表编辑页
 *
 * @author
 * @Date 2021-07-30 13:00:02
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {crmCustomerLevelDetail, crmCustomerLevelAdd, crmCustomerLevelEdit} from '../crmCustomerLevelUrl';
import * as SysField from '../crmCustomerLevelField';

const {FormItem} = Form;

const ApiConfig = {
  view: crmCustomerLevelDetail,
  add: crmCustomerLevelAdd,
  save: crmCustomerLevelEdit
};

const CrmCustomerLevelEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="customerLevelId"
    >
      <FormItem label="级别" name="level" component={SysField.Level} required/>
      <FormItem label="数字级别" name="rank" component={SysField.Level} required/>
    </Form>
  );
};

export default CrmCustomerLevelEdit;
