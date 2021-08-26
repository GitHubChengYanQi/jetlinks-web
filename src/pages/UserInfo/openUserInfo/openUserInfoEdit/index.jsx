/**
 * 编辑页
 *
 * @author 
 * @Date 2021-08-25 08:31:10
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {openUserInfoDetail, openUserInfoAdd, openUserInfoEdit} from '../openUserInfoUrl';
import * as SysField from '../openUserInfoField';

const {FormItem} = Form;

const ApiConfig = {
  view: openUserInfoDetail,
  add: openUserInfoAdd,
  save: openUserInfoEdit
};

const OpenUserInfoEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="primaryKey"
    >
      <FormItem label="会员编号" name="memberId" component={SysField.MemberId} required/>
      <FormItem label="用户第三方系统的唯一id" name="uuid" component={SysField.Uuid} required/>
      <FormItem label="用户来源" name="source" component={SysField.Source} required/>
      <FormItem label="用户名" name="username" component={SysField.Username} required/>
      <FormItem label="用户昵称" name="nickname" component={SysField.Nickname} required/>
    </Form>
  );
};

export default OpenUserInfoEdit;
