/**
 * 分类导航编辑页
 *
 * @author siqiang
 * @Date 2021-08-18 15:53:56
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {classDetail, classAdd, classEdit} from '../classUrl';
import * as SysField from '../classField';

const {FormItem} = Form;

const ApiConfig = {
  view: classDetail,
  add: classAdd,
  save: classEdit
};

const ClassEdit = ({...props}) => {

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

export default ClassEdit;
