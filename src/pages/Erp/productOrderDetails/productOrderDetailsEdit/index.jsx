/**
 * 产品订单详情编辑页
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {productOrderDetailsDetail, productOrderDetailsAdd, productOrderDetailsEdit} from '../productOrderDetailsUrl';
import * as SysField from '../productOrderDetailsField';

const {FormItem} = Form;

const ApiConfig = {
  view: productOrderDetailsDetail,
  add: productOrderDetailsAdd,
  save: productOrderDetailsEdit
};

const ProductOrderDetailsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="productOrderDetailsId"
    >
      <FormItem label="产品订单id" name="productOrderId" component={SysField.ProductOrderId} required/>
      <FormItem label="spuId" name="spuId" component={SysField.SpuId} required/>
      <FormItem label="skuId" name="skuId" component={SysField.SkuId} required/>
      <FormItem label="数量" name="number" component={SysField.Number} required/>
      <FormItem label="金额" name="money" component={SysField.Money} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门编号" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default ProductOrderDetailsEdit;
