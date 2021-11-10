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
    </Form>
  );
};

export default OrCodeEdit;
