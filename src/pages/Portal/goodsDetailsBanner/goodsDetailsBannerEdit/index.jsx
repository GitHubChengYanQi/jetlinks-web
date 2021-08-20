/**
 * 商品轮播图编辑页
 *
 * @author siqiang
 * @Date 2021-08-19 16:34:29
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {goodsDetailsBannerDetail, goodsDetailsBannerAdd, goodsDetailsBannerEdit} from '../goodsDetailsBannerUrl';
import * as SysField from '../goodsDetailsBannerField';
import {goodDetailsId} from "../goodsDetailsBannerField";

const {FormItem} = Form;

const ApiConfig = {
  view: goodsDetailsBannerDetail,
  add: goodsDetailsBannerAdd,
  save: goodsDetailsBannerEdit
};

const GoodsDetailsBannerEdit = ({...props}) => {
  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="detailBannerId"
    >
      <FormItem style={{'display':'none'}} name="goodDetailsId" component={SysField.goodDetailsId} value={props.goodDetailId} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
      <FormItem label="图片路径" name="imgUrl" component={SysField.ImgUrl} required/>
    </Form>
  );
};

export default GoodsDetailsBannerEdit;
