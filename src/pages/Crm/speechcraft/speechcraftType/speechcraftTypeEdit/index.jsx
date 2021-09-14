/**
 * 话术分类编辑页
 *
 * @author
 * @Date 2021-09-13 13:00:15
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {speechcraftTypeDetail, speechcraftTypeAdd, speechcraftTypeEdit} from '../speechcraftTypeUrl';
import * as SysField from '../speechcraftTypeField';

const {FormItem} = Form;

const ApiConfig = {
  view: speechcraftTypeDetail,
  add: speechcraftTypeAdd,
  save: speechcraftTypeEdit
};

const SpeechcraftTypeEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="speechcraftTypeId"
    >
      <FormItem label="分类名称" name="speechcraftTypeName" component={SysField.SpeechcraftTypeName} required/>
      <FormItem label="分类排序" name="speechcraftTypeSort" component={SysField.SpeechcraftTypeSort} required/>
    </Form>
  );
};

export default SpeechcraftTypeEdit;
