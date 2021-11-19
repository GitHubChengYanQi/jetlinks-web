/**
 * 流程主表编辑页
 *
 * @author c
 * @Date 2021-11-19 10:58:01
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {processDetail, processAdd, processEdit} from '../processUrl';
import * as SysField from '../processField';

const {FormItem} = Form;

const ApiConfig = {
  view: processDetail,
  add: processAdd,
  save: processEdit
};

const ProcessEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="processId"
    >
      <FormItem label="名称" name="processName" component={SysField.ProcessName} required/>
      {/*<FormItem label="分类Id" name="categoryId" component={SysField.CategoryId} required/>*/}
      <FormItem label="类型" name="type" component={SysField.Type} required/>
      {/*<FormItem label="工艺表Id或表单Id" name="formId" component={SysField.FormId} required/>*/}
    </Form>
  );
};

export default ProcessEdit;
