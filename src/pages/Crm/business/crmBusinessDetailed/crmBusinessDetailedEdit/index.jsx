/**
 * 商机明细表编辑页
 *
 * @author qr
 * @Date 2021-08-04 13:17:57
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {crmBusinessDetailedDetail, crmBusinessDetailedAdd, crmBusinessDetailedEdit} from '../crmBusinessDetailedUrl';
import * as SysField from '../crmBusinessDetailedField';

const {FormItem} = Form;

const ApiConfig = {
  view: crmBusinessDetailedDetail,
  add: crmBusinessDetailedAdd,
  save: crmBusinessDetailedEdit
};

const CrmBusinessDetailedEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >
      <FormItem style={{'display': 'none'}} name="businessId" component={SysField.BusinessId} required/>
      <FormItem style={{'display': 'none'}} name="itemId" component={SysField.ItemId} required/>
      <FormItem label="销售单价" name="salePrice" component={SysField.salePrice} required/>
      <FormItem label="数量" name="quantity" component={SysField.Quantity} required/>
    </Form>
  );
};

export default CrmBusinessDetailedEdit;
