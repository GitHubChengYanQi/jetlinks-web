/**
 * 采购报价表单编辑页
 *
 * @author Captain_Jazz
 * @Date 2021-12-22 11:17:27
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {purchaseQuotationDetail, purchaseQuotationAdd, purchaseQuotationEdit} from '../purchaseQuotationUrl';
import * as SysField from '../purchaseQuotationField';

const {FormItem} = Form;

const ApiConfig = {
  view: purchaseQuotationDetail,
  add: purchaseQuotationAdd,
  save: purchaseQuotationEdit
};

const PurchaseQuotationEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="purchaseQuotationId"
    >
      <FormItem label="物料id" name="skuId" component={SysField.SkuId} required/>
      <FormItem label="价格" name="price" component={SysField.Price} required/>
      <FormItem label="供应商id" name="customerId" component={SysField.CustomerId} required/>
      <FormItem label="报价有效期" name="periodOfValidity" component={SysField.PeriodOfValidity} required/>
      <FormItem label="数量" name="total" component={SysField.Total} required/>
      <FormItem label="是否含税" name="isTax" component={SysField.IsTax} required/>
      <FormItem label="税前单价" name="preTax" component={SysField.PreTax} required/>
      <FormItem label="运费价格" name="freight" component={SysField.Freight} required/>
      <FormItem label="税后单价" name="afterTax" component={SysField.AfterTax} required/>
      <FormItem label="是否包含运费" name="isFreight" component={SysField.IsFreight} required/>
      <FormItem label="来源" name="source" component={SysField.Source} required/>
      <FormItem label="来源id" name="sourceId" component={SysField.SourceId} required/>
      <FormItem label="关联表id" name="fornId" component={SysField.FornId} required/>
    </Form>
  );
};

export default PurchaseQuotationEdit;
