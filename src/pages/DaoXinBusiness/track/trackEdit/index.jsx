/**
 * 报价表编辑页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {trackDetail, trackAdd, trackEdit} from '../trackUrl';
import * as SysField from '../trackField';

const {FormItem} = Form;

const ApiConfig = {
  view: trackDetail,
  add: trackAdd,
  save: trackEdit
};

const TrackEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="trackId"
    >
      <FormItem label="客户名称" name="businessId" component={SysField.Business} required/>
      <FormItem label="商品名称" name="stockId" component={SysField.Stock} required/>
      <FormItem label="报价金额" name="money" component={SysField.Money} required/>
      <FormItem label="数量" name="number" component={SysField.Number} required/>
      <FormItem label="报价时间" name="time" component={SysField.Time} required/>
      <FormItem label="报价阶段" name="stage" component={SysField.Stage} required/>
      <FormItem label="备注" name="note" component={SysField.Note} required/>
    </Form>
  );
};

export default TrackEdit;
