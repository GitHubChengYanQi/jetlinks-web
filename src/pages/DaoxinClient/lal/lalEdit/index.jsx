/**
 * 经纬度表编辑页
 *
 * @author 
 * @Date 2021-07-16 12:55:35
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {lalDetail, lalAdd, lalEdit} from '../lalUrl';
import * as SysField from '../lalField';

const {FormItem} = Form;

const ApiConfig = {
  view: lalDetail,
  add: lalAdd,
  save: lalEdit
};

const LalEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="lalId"
    >
      <FormItem label="客户名称" name="name" component={SysField.Name} required/>
      <FormItem label="经度" name="ewItude" component={SysField.EwItude} required/>
      <FormItem label="纬度" name="snItude" component={SysField.SnItude} required/>
    </Form>
  );
};

export default LalEdit;
