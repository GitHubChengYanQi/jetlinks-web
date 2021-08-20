/**
 * 首页商品详情编辑页
 *
 * @author siqiang
 * @Date 2021-08-19 13:30:45
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {goodsDetailsDetail, goodsDetailsAdd, goodsDetailsEdit} from '../goodsDetailsUrl';
import * as SysField from '../goodsDetailsField';

const {FormItem} = Form;

const ApiConfig = {
  view: goodsDetailsDetail,
  add: goodsDetailsAdd,
  save: goodsDetailsEdit
};

const GoodsDetailsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="goodDetailsId"
    >
      {/*<FormItem label="商品id" name="goodId" component={SysField.GoodId} required/>*/}
      {/*<FormItem label="商品图片" name="detailBannerId" component={SysField.DetailBannerId} required/>*/}
      <FormItem label="商品标题" name="title" component={SysField.Title} disabled required/>
      <FormItem label="商品售价" name="price" component={SysField.Price} disabled required/>
      <FormItem label="商品原价" name="lastPrice" component={SysField.LastPrice} disabled required/>
      <FormItem label="服务" name="server" component={SysField.Server} required/>
      <FormItem label="规格id" name="specificationId" component={SysField.SpecificationId} required/>
      <FormItem label="商品详情" name="details" component={SysField.Details} required/>
      {/*<FormItem label="排序" name="sort" component={SysField.Sort} required/>*/}
    </Form>
  );
};

export default GoodsDetailsEdit;
