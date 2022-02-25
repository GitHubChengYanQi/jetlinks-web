/**
 * 编辑页
 *
 * @author song
 * @Date 2022-02-24 14:55:10
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {bankDetail, bankAdd, bankEdit} from '../bankUrl';
import * as SysField from '../bankField';

const {FormItem} = Form;

const ApiConfig = {
  view: bankDetail,
  add: bankAdd,
  save: bankEdit
};

const BankEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="bankId"
    >
      <FormItem label="银行名称" name="bankName" component={SysField.BankName} required/>
    </Form>
  );
};

export default BankEdit;
