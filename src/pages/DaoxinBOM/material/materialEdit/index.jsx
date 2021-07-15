/**
 * 材质编辑页
 *
 * @author cheng
 * @Date 2021-07-14 15:56:05
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {materialDetail, materialAdd, materialEdit} from '../materialUrl';
import * as SysField from '../materialField';

const {FormItem} = Form;

const ApiConfig = {
  view: materialDetail,
  add: materialAdd,
  save: materialEdit
};

const MaterialEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="materialId"
    >
      <FormItem label="材质名字" name="name" component={SysField.Name} required/>
    </Form>
  );
};

export default MaterialEdit;
