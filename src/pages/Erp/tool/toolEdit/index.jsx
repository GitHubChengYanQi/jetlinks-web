/**
 * 工具表编辑页
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {toolDetail, toolAdd, toolEdit} from '../toolUrl';
import * as SysField from '../toolField';

const {FormItem} = Form;

const ApiConfig = {
  view: toolDetail,
  add: toolAdd,
  save: toolEdit
};

const ToolEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="toolId"
    >
      <FormItem label="工具名称" name="name" component={SysField.Name} required/>
      <FormItem label="工具状态" name="state" component={SysField.State} required/>
      <FormItem label="备注" name="note" component={SysField.Note} required/>
      <FormItem label="附件" name="attachment" component={SysField.Attachment} required/>
      <FormItem label="单位id" name="unitId" component={SysField.UnitId} required/>
      <FormItem label="工具分类id" name="toolClassificationId" component={SysField.ToolClassificationId} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default ToolEdit;
