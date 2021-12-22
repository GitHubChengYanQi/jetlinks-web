/**
 * 编辑页
 *
 * @author
 * @Date 2021-12-21 11:29:07
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {taxRateDetail, taxRateAdd, taxRateEdit} from '../taxRateUrl';
import * as SysField from '../taxRateField';

const {FormItem} = Form;

const ApiConfig = {
  view: taxRateDetail,
  add: taxRateAdd,
  save: taxRateEdit
};

const TaxRateEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="taxRateId"
    >
      <FormItem label="税率名称" name="taxRateName" component={SysField.TaxRateName} required/>
      <FormItem label="税率值" name="taxRateValue" component={SysField.TaxRateValue} required/>
    </Form>
  );
};

export default TaxRateEdit;
