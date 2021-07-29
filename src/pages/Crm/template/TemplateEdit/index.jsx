/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {templateDetail, templateAdd, templateEdit} from '../TemplateUrl';
import * as SysField from '../TemplateField';

const {FormItem} = Form;

const ApiConfig = {
  view: templateDetail,
  add: templateAdd,
  save: templateEdit
};

const TemplateEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="templateId"
    >
      <FormItem label="合同名" name="name" component={SysField.Name} required/>
      <FormItem label="合同内容" name="content" component={SysField.Content} required/>

    </Form>

  );
};

export default TemplateEdit;
