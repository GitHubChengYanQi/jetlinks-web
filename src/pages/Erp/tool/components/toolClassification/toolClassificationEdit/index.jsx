/**
 * 工具分类表编辑页
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {toolClassificationDetail, toolClassificationAdd, toolClassificationEdit} from '../toolClassificationUrl';
import * as SysField from '../toolClassificationField';

const {FormItem} = Form;

const ApiConfig = {
  view: toolClassificationDetail,
  add: toolClassificationAdd,
  save: toolClassificationEdit
};

const ToolClassificationEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="toolClassificationId"
    >
      <FormItem label="分类名称" name="name" component={SysField.Name} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default ToolClassificationEdit;
