/**
 * 套餐表编辑页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {erpPackageDetail, erpPackageAdd, erpPackageEdit} from '../erpPackageUrl';
import * as SysField from '../erpPackageField';

const {FormItem} = Form;

const ApiConfig = {
  view: erpPackageDetail,
  add: erpPackageAdd,
  save: erpPackageEdit
};

const ErpPackageEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="packageId"
    >
      <FormItem label="产品名称" name="productName" component={SysField.ProductName} required/>
    </Form>
  );
};

export default ErpPackageEdit;
