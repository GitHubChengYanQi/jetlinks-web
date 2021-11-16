/**
 * 质检任务详情编辑页
 *
 * @author 
 * @Date 2021-11-16 09:54:41
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {qualityTaskDetailDetail, qualityTaskDetailAdd, qualityTaskDetailEdit} from '../qualityTaskDetailUrl';
import * as SysField from '../qualityTaskDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: qualityTaskDetailDetail,
  add: qualityTaskDetailAdd,
  save: qualityTaskDetailEdit
};

const QualityTaskDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="qualityTaskDetailId"
    >
      <FormItem label="物料id" name="skuId" component={SysField.SkuId} required/>
      <FormItem label="主表id" name="qualityTaskId" component={SysField.QualityTaskId} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
    </Form>
  );
};

export default QualityTaskDetailEdit;
