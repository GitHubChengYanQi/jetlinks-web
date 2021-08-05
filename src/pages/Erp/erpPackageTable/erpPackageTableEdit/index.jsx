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
      <FormItem label="套餐id" name="packageId" component={SysField.PackageId} required/>
      <FormItem label="套餐" name="package" component={SysField.Package} required/>
    </Form>
  );
};

export default ErpPackageTableEdit;
