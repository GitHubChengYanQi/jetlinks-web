/**
 * 套餐分表编辑页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {erpPackageTableDetail, erpPackageTableAdd, erpPackageTableEdit} from '../erpPackageTableUrl';
import * as SysField from '../erpPackageTableField';
import {itemId, quantity} from "../erpPackageTableField";

const {FormItem} = Form;

const ApiConfig = {
  view: erpPackageTableDetail,
  add: erpPackageTableAdd,
  save: erpPackageTableEdit
};

const ErpPackageTableEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >
      <FormItem style={{'display': 'none'}} name="packageId" component={SysField.PackageId} required/>
      <FormItem style={{'display': 'none'}} name="itemId" component={SysField.itemId} required/>
      <FormItem label="销售单价" name="salePrice" component={SysField.salePrice} required/>
      <FormItem label="数量" name="quantity" component={SysField.Quantity} required/>
    </Form>
  );
};

export default ErpPackageTableEdit;
