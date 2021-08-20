/**
 * 报修编辑页
 *
 * @author siqiang
 * @Date 2021-08-20 17:16:16
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {companyAddressDetail, companyAddressAdd, companyAddressEdit} from '../companyAddressUrl';
import * as SysField from '../companyAddressField';

const {FormItem} = Form;

const ApiConfig = {
  view: companyAddressDetail,
  add: companyAddressAdd,
  save: companyAddressEdit
};

const CompanyAddressEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="companyId"
    >
      <FormItem label="报修id" name="repairId" component={SysField.RepairId} required/>
      <FormItem label="报修地址" name="addressId" component={SysField.AddressId} required/>
      <FormItem label="省" name="province" component={SysField.Province} required/>
      <FormItem label="市" name="city" component={SysField.City} required/>
      <FormItem label="区" name="area" component={SysField.Area} required/>
      <FormItem label="详细地址" name="address" component={SysField.Address} required/>
      <FormItem label="姓名" name="people" component={SysField.People} required/>
      <FormItem label="职务" name="position" component={SysField.Position} required/>
      <FormItem label="电话" name="telephone" component={SysField.Telephone} required/>
    </Form>
  );
};

export default CompanyAddressEdit;
