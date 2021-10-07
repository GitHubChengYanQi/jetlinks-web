/**
 * 客户地址表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:11
 */

import React, {useRef, useState} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import * as SysField from '../AdressField';
import {adressAdd, adressDetail, adressEdit} from '@/pages/Crm/adress/AdressUrl';
import {FormEffectHooks} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: adressDetail,
  add: adressAdd,
  save: adressEdit
};

const AdressEdit = ({...props}) => {

  const {customerId} = props;

  const formRef = useRef();

  const [city,setCity] = useState();

  const { onFieldChange$ } = FormEffectHooks;

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="adressId"
      effect={()=>{
        onFieldChange$('map').subscribe(({ value }) => {
          setCity(value && value.city);
        });
      }}
    >
      <FormItem label="省市区地址" name="region" component={SysField.Region} city={city} required/>
      <FormItem label='详细地址' name="map" component={SysField.Map}/>
      <FormItem hidden customer={customerId} name="customerId" component={SysField.CustomerId} required/>
    </Form>
  );
};

export default AdressEdit;
