/**
 * 商机表编辑页
 *
 * @author ta
 * @Date 2021-07-17 15:28:13
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import { commercialDetail,  commercialAdd,  commercialEdit} from '../ commercialUrl';
import * as SysField from '../ commercialField';

const {FormItem} = Form;

const ApiConfig = {
  view:  commercialDetail,
  add:  commercialAdd,
  save:  commercialEdit
};

const  CommercialEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="commercialId"
    >
      <FormItem label="客户名称" name="name" component={SysField.Name} required/>
      <FormItem label="报价编号" name="quoteId" component={SysField.QuoteId} required/>
      <FormItem label="机会阶段" name="phases" component={SysField.Phases} required/>
      <FormItem label="机会来源" name="source" component={SysField.Source} required/>
      <FormItem label="机会状态" name="state" component={SysField.State} required/>
      <FormItem label="负责人" name="main" component={SysField.Main} required/>
    </Form>
  );
};

export default  CommercialEdit;
