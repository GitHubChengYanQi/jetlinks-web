/**
 * 合同表编辑页
 *
 * @author
 * @Date 2021-07-21 13:36:21
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {contractDetail, contractAdd, contractEdit} from '../contractUrl';
import * as SysField from '../contractField';

const {FormItem} = Form;

const ApiConfig = {
  view: contractDetail,
  add: contractAdd,
  save: contractEdit
};

const ContractEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="contractId"
    >
      <FormItem label="合同名称" name="name" component={SysField.Name} required/>
      <FormItem label="负责人id" name="userId" component={SysField.UserId} required/>
      <FormItem label="备注" name="note" component={SysField.Note} required/>
      <FormItem label="创建时间" name="time" component={SysField.Time} required/>
      <FormItem label="内容" name="content" component={SysField.Content} required/>
    </Form>
  );
};

export default ContractEdit;
