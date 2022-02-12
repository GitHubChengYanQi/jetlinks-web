/**
 * sop详情编辑页
 *
 * @author song
 * @Date 2022-02-10 09:21:35
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {sopDetailDetail, sopDetailAdd, sopDetailEdit} from '../sopDetailUrl';
import * as SysField from '../sopDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: sopDetailDetail,
  add: sopDetailAdd,
  save: sopDetailEdit
};

const SopDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="sopDetailId"
    >
      <FormItem label="sop" name="sopId" component={SysField.SopId} required/>
      <FormItem label="步骤名" name="stepName" component={SysField.StepName} required/>
      <FormItem label="示例图" name="img" component={SysField.Img} required/>
      <FormItem label="操作说明" name="instructions" component={SysField.Instructions} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
    </Form>
  );
};

export default SopDetailEdit;
