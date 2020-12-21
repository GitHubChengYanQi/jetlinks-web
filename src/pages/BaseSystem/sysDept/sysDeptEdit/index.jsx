/**
 * 部门表编辑页
 *
 * @author 
 * @Date 2020-12-21 17:16:04
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {sysDeptDetail, sysDeptAdd, sysDeptEdit} from '../sysDeptUrl';
import * as SysField from '../sysDeptField';

const {FormItem} = Form;

const ApiConfig = {
  view: sysDeptDetail,
  add: sysDeptAdd,
  save: sysDeptEdit
};

const SysDeptEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="deptId"
    >
      <FormItem label="父部门id" name="pidValue" component={SysField.Pid} required/>
      <FormItem label="简称" name="simpleName" component={SysField.SimpleName} required/>
      <FormItem label="全称" name="fullName" component={SysField.FullName} required/>
      <FormItem label="描述" name="description" component={SysField.Description} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
    </Form>
  );
};

export default SysDeptEdit;
