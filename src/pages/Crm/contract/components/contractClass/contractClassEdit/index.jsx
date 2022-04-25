/**
 * 合同分类编辑页
 *
 * @author song
 * @Date 2021-12-09 14:11:38
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {contractClassDetail, contractClassAdd, contractClassEdit} from '../contractClassUrl';
import * as SysField from '../contractClassField';

const {FormItem} = Form;

const ApiConfig = {
  view: contractClassDetail,
  add: contractClassAdd,
  save: contractClassEdit
};

const ContractClassEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      formType="contractClass"
      ref={formRef}
      api={ApiConfig}
      fieldKey="contractClassId"
    >
      <FormItem label="名称" name="name" component={SysField.Name} required />
    </Form>
  );
};

export default ContractClassEdit;
