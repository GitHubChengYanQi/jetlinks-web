/**
 * 话术分类详细编辑页
 *
 * @author cheng
 * @Date 2021-09-13 15:24:19
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {speechcraftTypeDetailDetail, speechcraftTypeDetailAdd, speechcraftTypeDetailEdit} from '../speechcraftTypeDetailUrl';
import * as SysField from '../speechcraftTypeDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: speechcraftTypeDetailDetail,
  add: speechcraftTypeDetailAdd,
  save: speechcraftTypeDetailEdit
};

const SpeechcraftTypeDetailEdit = ({...props}) => {

  const {speechcraftTypeId} = props;

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="speechcraftTypeDetailId"
    >
      <FormItem label="名称" name="name" component={SysField.Name} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
      <FormItem display hidden name="speechcraftTypeId" component={SysField.SpeechcraftTypeId} speechcraftTypeId={speechcraftTypeId}/>
    </Form>
  );
};

export default SpeechcraftTypeDetailEdit;
