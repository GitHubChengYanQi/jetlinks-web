/**
 * 报价表编辑页
 *
 * @author ta
 * @Date 2021-07-17 15:28:13
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {quoteDetail, quoteAdd, quoteEdit} from '../quoteUrl';
import * as SysField from '../quoteField';

const {FormItem} = Form;

const ApiConfig = {
  view: quoteDetail,
  add: quoteAdd,
  save: quoteEdit
};

const QuoteEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >
      <FormItem label="报价单标题" name="title" component={SysField.Title} required/>
      <FormItem label="报价单编号" name="quoteId" component={SysField.QuoteId} required/>
      <FormItem label="客户名称" name="name" component={SysField.Name} required/>
      <FormItem label="总金额" name="prices" component={SysField.Prices} required/>
      <FormItem label="报价阶段" name="quotePhases" component={SysField.QuotePhases} required/>
      <FormItem label="报价人" name="people" component={SysField.People} required/>
    </Form>
  );
};

export default QuoteEdit;
