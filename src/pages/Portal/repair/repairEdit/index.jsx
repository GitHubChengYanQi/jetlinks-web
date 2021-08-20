/**
 * 报修编辑页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {repairDetail, repairAdd, repairEdit} from '../repairUrl';
import * as SysField from '../repairField';

const {FormItem} = Form;

const ApiConfig = {
  view: repairDetail,
  add: repairAdd,
  save: repairEdit
};

const RepairEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="repairId"
    >
      <FormItem label="报修单位" name="companyId" component={SysField.CompanyId} required/>
      <FormItem label="保修部位图片" name="itemImgUrl" component={SysField.ItemImgUrl} required/>
      <FormItem label="设备id" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="服务类型" name="serviceType" component={SysField.ServiceType} required/>
      <FormItem label="期望到达日期" name="expectTime" component={SysField.ExpectTime} required/>
      <FormItem label="描述" name="comment" component={SysField.Comment} required/>
      <FormItem label="工程进度" name="progress" component={SysField.Progress} required/>
      <FormItem label="维修费用" name="money" component={SysField.Money} required/>
      <FormItem label="质保类型" name="qualityType" component={SysField.QualityType} required/>
      <FormItem label="合同类型" name="contractType" component={SysField.ContractType} required/>
    </Form>
  );
};

export default RepairEdit;
