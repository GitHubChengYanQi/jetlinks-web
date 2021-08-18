/**
 * 轮播图编辑页
 *
 * @author
 * @Date 2021-08-17 14:05:06
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {bannerDetail, bannerAdd, bannerEdit} from '../bannerUrl';
import * as SysField from '../bannerField';

const {FormItem} = Form;

const ApiConfig = {
  view: bannerDetail,
  add: bannerAdd,
  save: bannerEdit
};

const BannerEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="bannerId"
    >
      <FormItem label="轮播图标题" name="title" component={SysField.Title} required/>
      <FormItem label="图片" name="imgUrl" component={SysField.ImgUrl} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
      <FormItem label="链接" name="link" component={SysField.Link} required/>
      <FormItem label="分类" name="difference" component={SysField.Difference} required/>
    </Form>
  );
};

export default BannerEdit;
