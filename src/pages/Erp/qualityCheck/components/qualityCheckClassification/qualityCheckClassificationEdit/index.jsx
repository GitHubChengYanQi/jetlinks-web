/**
 * 质检分类表编辑页
 *
 * @author song
 * @Date 2021-10-27 13:08:57
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {qualityCheckClassificationDetail, qualityCheckClassificationAdd, qualityCheckClassificationEdit} from '../qualityCheckClassificationUrl';
import * as SysField from '../qualityCheckClassificationField';

const {FormItem} = Form;

const ApiConfig = {
  view: qualityCheckClassificationDetail,
  add: qualityCheckClassificationAdd,
  save: qualityCheckClassificationEdit
};

const QualityCheckClassificationEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="qualityCheckClassificationId"
    >
      <FormItem label="名称" name="name" component={SysField.Name} required/>
    </Form>
  );
};

export default QualityCheckClassificationEdit;
