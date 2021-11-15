/**
 * 二维码编辑页
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {orCodeDetail, orCodeAdd, orCodeEdit, orCodeBatchAdd} from '../qrCodeUrl';
import * as SysField from '../qrCodeField';

const {FormItem} = Form;

const ApiConfig = {
  view: orCodeDetail,
  add: orCodeBatchAdd,
  save: orCodeEdit
};

const QrCodeEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="orCodeId"
    >
      <FormItem label="批量生成" name="addSize" component={SysField.Number} required/>
    </Form>
  );
};

export default QrCodeEdit;
