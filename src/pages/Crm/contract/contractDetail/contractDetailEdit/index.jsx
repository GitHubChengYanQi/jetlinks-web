/**
 * 合同产品明细编辑页
 *
 * @author sb
 * @Date 2021-09-18 15:29:24
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {contractDetailDetail, contractDetailAdd, contractDetailEdit} from '../contractDetailUrl';
import * as SysField from '../contractDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: contractDetailDetail,
  add: contractDetailAdd,
  save: contractDetailEdit
};

const ContractDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >
      <FormItem label="合同id" name="contractId" component={SysField.ContractId} required/>
      <FormItem label="物品id" name="itemId" component={SysField.ItemId} required/>
      <FormItem label="物品数量" name="quantity" component={SysField.Quantity} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="销售单价" name="salePrice" component={SysField.SalePrice} required/>
      <FormItem label="总计" name="totalPrice" component={SysField.TotalPrice} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default ContractDetailEdit;
