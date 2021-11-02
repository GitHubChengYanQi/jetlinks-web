/**
 * 二维码编辑页
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {orCodeDetail, orCodeAdd, orCodeEdit} from '../orCodeUrl';
import * as SysField from '../orCodeField';

const {FormItem} = Form;

const ApiConfig = {
  view: orCodeDetail,
  add: orCodeAdd,
  save: orCodeEdit
};

const OrCodeEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="orCodeId"
    >
      <FormItem label="类型" name="type" component={SysField.Type} required/>
      <FormItem label="信息" name="data" component={SysField.Data} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default OrCodeEdit;
