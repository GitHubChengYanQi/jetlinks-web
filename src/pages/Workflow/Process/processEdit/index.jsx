/**
 * 流程主表编辑页
 *
 * @author c
 * @Date 2021-11-19 10:58:01
 */

import React, {useRef} from 'react';
import {FormEffectHooks} from '@formily/antd';
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
      effects={({setFieldState}) => {
        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {

          setFieldState('module', state => {
            state.props.type = value;
          });
        });
      }}
    >
      <FormItem label="名称" name="processName" component={SysField.ProcessName} required />
      <FormItem label="类型" name="type" component={SysField.Type} required />
      <FormItem label="功能" name="module" component={SysField.Module} required />
    </Form>
  );
};

export default ProcessEdit;
