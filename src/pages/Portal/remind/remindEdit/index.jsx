/**
 * 提醒表编辑页
 *
 * @author cheng
 * @Date 2021-08-26 15:50:39
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {remindDetail, remindAdd, remindEdit} from '../remindUrl';
import * as SysField from '../remindField';

const {FormItem} = Form;

const ApiConfig = {
  view: remindDetail,
  add: remindAdd,
  save: remindEdit
};

const RemindEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="remindId"
    >
      <FormItem label="提醒类型" name="type" component={SysField.Type} required/>
      <FormItem label="提醒人" name="users" component={SysField.UserId} required/>
    </Form>
  );
};

export default RemindEdit;
