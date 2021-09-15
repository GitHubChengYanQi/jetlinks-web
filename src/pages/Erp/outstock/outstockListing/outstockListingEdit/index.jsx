/**
 * 出库清单编辑页
 *
 * @author cheng
 * @Date 2021-09-15 11:15:44
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {outstockListingDetail, outstockListingAdd, outstockListingEdit} from '../outstockListingUrl';
import * as SysField from '../outstockListingField';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockListingDetail,
  add: outstockListingAdd,
  save: outstockListingEdit
};

const OutstockListingEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outstockListingId"
    >
      <FormItem label="出库时间" name="time" component={SysField.Time} required/>
      <FormItem label="出库数量" name="number" component={SysField.Number} required/>
      <FormItem label="出库价格" name="price" component={SysField.Price} required/>
      <FormItem label="品牌id" name="brandId" component={SysField.BrandId} required/>
      <FormItem label="部门编号" name="deptId" component={SysField.DeptId} required/>
      <FormItem label="产品id" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="出库状态" name="state" component={SysField.State} required/>
      <FormItem label="出库单号" name="outstockOrderId" component={SysField.OutstockOrderId} required/>
      <FormItem label="发货申请" name="outstockApplyId" component={SysField.OutstockApplyId} required/>
    </Form>
  );
};

export default OutstockListingEdit;
