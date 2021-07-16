/**
 * 客户地址表编辑页
 *
 * @author 
 * @Date 2021-07-16 12:55:35
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {adressDetail, adressAdd, adressEdit} from '../adressUrl';
import * as SysField from '../adressField';

const {FormItem} = Form;

const ApiConfig = {
  view: adressDetail,
  add: adressAdd,
  save: adressEdit
};

const AdressEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="adressId"
    >
      <FormItem label="客户名称" name="name" component={SysField.Name} required/>
      <FormItem label="地址1id" name="adress1Id" component={SysField.Adress1Id} required/>
      <FormItem label="地址1" name="adress1" component={SysField.Adress1} required/>
      <FormItem label="地址2id" name="adress2Id" component={SysField.Adress2Id} required/>
      <FormItem label="地址2" name="adress2" component={SysField.Adress2} required/>
    </Form>
  );
};

export default AdressEdit;
