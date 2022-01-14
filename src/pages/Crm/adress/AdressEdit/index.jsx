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
import {createFormActions, FormEffectHooks} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: adressDetail,
  add: adressAdd,
  save: adressEdit
};

const AdressEdit = ({...props}) => {

  const {customer, ...other} = props;

  const formRef = useRef();

  const [city, setCity] = useState();

  const {onFieldChange$} = FormEffectHooks;

  const formActionsPublic = createFormActions();

  return (
    <div style={{padding:16}}>
      <Form
        {...other}
        ref={formRef}
        formActions={formActionsPublic}
        api={ApiConfig}
        fieldKey="adressId"
        onSuccess={(res) => {
          console.log(res);
          props.onSuccess(res.data.adressId);
        }}
        effects={() => {
          onFieldChange$('map').subscribe(({value}) => {
            setCity(value && value.city);
          });
        }}
        onError={() => {
        }}
      >
        <FormItem label="省市区地址" name="region" component={SysField.Region} city={city} required />
        <FormItem label="详细地址" name="map" component={SysField.Map} />
        <FormItem hidden customer={customer} name="customerId" component={SysField.CustomerId} required />
      </Form>
    </div>
  );
};

export default AdressEdit;
