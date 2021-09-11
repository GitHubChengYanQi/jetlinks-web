/**
 * 话术基础资料编辑页
 *
 * @author 
 * @Date 2021-09-11 13:27:08
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {speechcraftDetail, speechcraftAdd, speechcraftEdit} from '../speechcraftUrl';
import * as SysField from '../speechcraftField';

const {FormItem} = Form;

const ApiConfig = {
  view: speechcraftDetail,
  add: speechcraftAdd,
  save: speechcraftEdit
};

const SpeechcraftEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="speechcraftId"
    >
      <FormItem label="标题" name="speechcraftTitle" component={SysField.SpeechcraftTitle} required/>
      <FormItem label="详情" name="speechcraftDetails" component={SysField.SpeechcraftDetails} required/>
      <FormItem label="关键词" name="speechcraftKey" component={SysField.SpeechcraftKey} required/>
    </Form>
  );
};

export default SpeechcraftEdit;
