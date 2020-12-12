/**
 * 字段配置编辑页
 *
 * @author Sing
 * @Date 2020-12-12 10:33:42
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {fieldConfigDetail, fieldConfigAdd, fieldConfigEdit} from '../fieldConfigUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: fieldConfigDetail,
  add: fieldConfigAdd,
  save: fieldConfigEdit
};

const FieldConfigEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="fieldId"
    >
      <FormItem label="字段名" name="fieldName" component={Input} required/>
      <FormItem label="表名" name="table" component={Input} required/>
      <FormItem label="字段类型" name="type" component={Input} required/>
      <FormItem label="数据配置" name="config" component={Input} required/>
      <FormItem label="是否列表显示" name="showList" component={Input} required/>
      <FormItem label="是否搜索" name="isSearch" component={Input} required/>
    </Form>
  );
};

export default FieldConfigEdit;
