/**
 * 二维码绑定编辑页
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {orCodeBindDetail, orCodeBindAdd, orCodeBindEdit} from '../orCodeBindUrl';
import * as SysField from '../orCodeBindField';

const {FormItem} = Form;

const ApiConfig = {
  view: orCodeBindDetail,
  add: orCodeBindAdd,
  save: orCodeBindEdit
};

const OrCodeBindEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="orCodeBindId"
    >
      <FormItem label="二维码id" name="orCodeId" component={SysField.OrCodeId} required/>
      <FormItem label="来源" name="source" component={SysField.Source} required/>
      <FormItem label="表单id" name="formId" component={SysField.FormId} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default OrCodeBindEdit;
