/**
 * 供应商黑名单编辑页
 *
 * @author Captian_Jazz
 * @Date 2021-12-20 11:20:05
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {supplierBlacklistDetail, supplierBlacklistAdd, supplierBlacklistEdit} from '../supplierBlacklistUrl';
import * as SysField from '../supplierBlacklistField';

const {FormItem} = Form;

const ApiConfig = {
  view: supplierBlacklistDetail,
  add: supplierBlacklistAdd,
  save: supplierBlacklistEdit
};

const SupplierBlacklistEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="blackListId"
    >
      <FormItem label="供应商id" name="supplierId" component={SysField.SupplierId} required/>
      <FormItem label="备注（原因）" name="remark" component={SysField.Remark} required/>
      <FormItem label="删除状态" name="display" component={SysField.Display} required/>
    </Form>
  );
};

export default SupplierBlacklistEdit;
