/**
 * 分类导航编辑页
 *
 * @author siqiang
 * @Date 2021-08-18 16:13:41
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {daoxinPortalClassDetail, daoxinPortalClassAdd, daoxinPortalClassEdit} from '../daoxinPortalClassUrl';
import * as SysField from '../daoxinPortalClassField';

const {FormItem} = Form;

const ApiConfig = {
  view: daoxinPortalClassDetail,
  add: daoxinPortalClassAdd,
  save: daoxinPortalClassEdit
};

const DaoxinPortalClassEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="classId"
    >
      <FormItem label="分类名称" name="className" component={SysField.ClassName} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
      <FormItem label="轮播图分类id" name="classificationId" component={SysField.ClassificationId} required/>
    </Form>
  );
};

export default DaoxinPortalClassEdit;
