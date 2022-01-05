/**
 * 编辑模板编辑页
 *
 * @author Captain_Jazz
 * @Date 2021-12-28 13:24:55
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {printTemplateDetail, printTemplateAdd, printTemplateEdit} from '../printTemplateUrl';
import * as SysField from '../printTemplateField';
import {FormEffectHooks} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: printTemplateDetail,
  add: printTemplateAdd,
  save: printTemplateEdit
};

const PrintTemplateEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="printTemplateId"
      effects={({setFieldState}) => {
        FormEffectHooks.onFieldValueChange$('type').subscribe(({value})=>{
          setFieldState('templete',(state)=>{
            state.props.type = value;
          });
        });
      }}
    >
      <FormItem label="类型" name="type" component={SysField.Type} required/>
      <FormItem label="名称" name="name" component={SysField.Name} required/>
      <FormItem label="模板" name="templete" component={SysField.Templete} required/>
    </Form>
  );
};

export default PrintTemplateEdit;
