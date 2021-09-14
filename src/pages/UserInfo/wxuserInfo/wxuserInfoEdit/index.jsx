/**
 * 用户小程序关联编辑页
 *
 * @author cheng
 * @Date 2021-09-14 08:37:48
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {wxuserInfoDetail, wxuserInfoAdd, wxuserInfoEdit, binding} from '../wxuserInfoUrl';
import * as SysField from '../wxuserInfoField';

const {FormItem} = Form;

const ApiConfig = {
  view: wxuserInfoDetail,
  add: binding,
  save: wxuserInfoEdit
};

const WxuserInfoEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="userInfoId"
    >
      <FormItem label="用户名称" name="userId" component={SysField.UserId} required/>
      <FormItem label="微信用户" name="memberId" component={SysField.MemberId} required/>
    </Form>
  );
};

export default WxuserInfoEdit;
