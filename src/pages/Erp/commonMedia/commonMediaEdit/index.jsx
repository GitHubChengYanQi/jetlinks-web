/**
 * 编辑页
 *
 * @author Captain_Jazz
 * @Date 2022-03-15 08:54:48
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {commonMediaDetail, commonMediaAdd, commonMediaEdit} from '../commonMediaUrl';
import * as SysField from '../commonMediaField';

const {FormItem} = Form;

const ApiConfig = {
  view: commonMediaDetail,
  add: commonMediaAdd,
  save: commonMediaEdit
};

const CommonMediaEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="mediaId"
    >
      <FormItem label="文件路径" name="path" component={SysField.Path} required/>
      <FormItem label="OSS储存区" name="endpoint" component={SysField.Endpoint} required/>
      <FormItem label="OSS储存块" name="bucket" component={SysField.Bucket} required/>
      <FormItem label="上传状态" name="status" component={SysField.Status} required/>
      <FormItem label="用户ID" name="userId" component={SysField.UserId} required/>
      <FormItem label="" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="" name="updateTime" component={SysField.UpdateTime} required/>
    </Form>
  );
};

export default CommonMediaEdit;
