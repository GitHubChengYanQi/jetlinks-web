/**
 * 客户地址表编辑页
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
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
      <FormItem label="地址" name="location" component={SysField.Location} required/>
      <FormItem label="经度" name="longitude" component={SysField.Longitude} required/>
      <FormItem label="纬度" name="latitude" component={SysField.Latitude} required/>
    </Form>
  );
};

export default AdressEdit;
