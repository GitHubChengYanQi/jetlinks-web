/**
 * 商机表编辑页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {businessDetail, businessAdd, businessEdit} from '../businessUrl';
import * as SysField from '../businessField';
import {Stock} from '../businessField';

const {FormItem} = Form;

const ApiConfig = {
  view: businessDetail,
  add: businessAdd,
  save: businessEdit
};

const BusinessEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="businessId"
    >
      <FormItem label="客户编号" name="clitenId" component={SysField.Client} required/>
      <FormItem label="物品编号" name="stockId" component={SysField.Stock} required/>
      <FormItem label="机会来源" name="sourceId" component={SysField.Source} required/>
      <FormItem label="立项日期" name="time" component={SysField.Time} required/>
      <FormItem label="商机状态" name="state" component={SysField.State} required/>
      <FormItem label="商机阶段" name="stage" component={SysField.Stage} required/>
      <FormItem label="负责人" name="account" component={SysField.Person} required/>
    </Form>
  );
};

export default BusinessEdit;
