/**
 * 询价任务详情编辑页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {inquiryTaskDetailDetail, inquiryTaskDetailAdd, inquiryTaskDetailEdit} from '../inquiryTaskDetailUrl';
import * as SysField from '../inquiryTaskDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: inquiryTaskDetailDetail,
  add: inquiryTaskDetailAdd,
  save: inquiryTaskDetailEdit
};

const InquiryTaskDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="inquiryDetailId"
    >
      <FormItem label="主表id" name="inquiryTaskId" component={SysField.InquiryTaskId} required/>
      <FormItem label="物料id" name="skuId" component={SysField.SkuId} required/>
      <FormItem label="数量" name="total" component={SysField.Total} required/>
      <FormItem label="备注" name="remark" component={SysField.Remark} required/>
    </Form>
  );
};

export default InquiryTaskDetailEdit;
