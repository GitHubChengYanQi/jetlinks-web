/**
 * 付款模板详情编辑页
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {paymentTemplateDetailDetail, paymentTemplateDetailAdd, paymentTemplateDetailEdit} from '../paymentTemplateDetailUrl';
import * as SysField from '../paymentTemplateDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: paymentTemplateDetailDetail,
  add: paymentTemplateDetailAdd,
  save: paymentTemplateDetailEdit
};

const PaymentTemplateDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="detailId"
    >
      <FormItem label="模板id" name="templateId" component={SysField.TemplateId} required/>
      <FormItem label="金额" name="money" component={SysField.Money} required/>
      <FormItem label="百分比" name="percentum" component={SysField.Percentum} required/>
      <FormItem label="付款类型" name="payType" component={SysField.PayType} required/>
      <FormItem label="付款日期" name="payTime" component={SysField.PayTime} required/>
      <FormItem label="日期方式" name="dateWay" component={SysField.DateWay} required/>
      <FormItem label="日期数" name="dateNumber" component={SysField.DateNumber} required/>
    </Form>
  );
};

export default PaymentTemplateDetailEdit;
