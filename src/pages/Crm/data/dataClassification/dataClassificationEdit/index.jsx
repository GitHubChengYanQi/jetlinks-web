/**
 * 资料分类表编辑页
 *
 * @author 
 * @Date 2021-09-13 12:51:21
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {dataClassificationDetail, dataClassificationAdd, dataClassificationEdit} from '../dataClassificationUrl';
import * as SysField from '../dataClassificationField';

const {FormItem} = Form;

const ApiConfig = {
  view: dataClassificationDetail,
  add: dataClassificationAdd,
  save: dataClassificationEdit
};

const DataClassificationEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="dataClassificationId"
    >
      <FormItem label="分类名称" name="title" component={SysField.Title} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
    </Form>
  );
};

export default DataClassificationEdit;
