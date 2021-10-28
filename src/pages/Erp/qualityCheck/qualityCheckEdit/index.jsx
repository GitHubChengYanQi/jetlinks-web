/**
 * 质检表编辑页
 *
 * @author song
 * @Date 2021-10-27 13:08:57
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {qualityCheckDetail, qualityCheckAdd, qualityCheckEdit} from '../qualityCheckUrl';
import * as SysField from '../qualityCheckField';

const {FormItem} = Form;

const ApiConfig = {
  view: qualityCheckDetail,
  add: qualityCheckAdd,
  save: qualityCheckEdit
};

const QualityCheckEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="qualityCheckId"
      >
        <FormItem label="名称" name="name" component={SysField.Name} required />
        <FormItem label="简称" name="simpleName" component={SysField.SimpleName} required />
        <FormItem
          label="质检分类"
          name="qualityCheckClassificationId"
          component={SysField.QualityCheckClassificationId}
          required />
        <FormItem label="工具" name="tools" component={SysField.Tool} required />
        <FormItem label="质检格式" name="type" component={SysField.Type}  required/>
        <FormItem label="备注" name="note" component={SysField.Note}  />
        <FormItem label="规范" name="norm" component={SysField.Norm}  />
        <FormItem label="附件" name="attachment" component={SysField.Attachment}  />
      </Form>
    </div>
  );
};

export default QualityCheckEdit;
