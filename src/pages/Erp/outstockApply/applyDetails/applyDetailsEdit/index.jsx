/**
 * 编辑页
 *
 * @author song
 * @Date 2021-09-15 09:42:47
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {applyDetailsDetail, applyDetailsAdd, applyDetailsEdit} from '../applyDetailsUrl';
import * as SysField from '../applyDetailsField';

const {FormItem} = Form;

const ApiConfig = {
  view: applyDetailsDetail,
  add: applyDetailsAdd,
  save: applyDetailsEdit
};

const ApplyDetailsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outstockApplyDetailsId"
    >
      <FormItem label="产品id" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="品牌id" name="brandId" component={SysField.BrandId} required/>
      <FormItem label="发货申请id" name="outstockApplyId" component={SysField.OutstockApplyId} required/>
    </Form>
  );
};

export default ApplyDetailsEdit;
