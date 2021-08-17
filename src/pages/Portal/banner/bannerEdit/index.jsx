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
      <FormItem label="图片路径" name="imgUrl" component={SysField.ImgUrl} required/>
    </Form>
  );
};

export default BannerEdit;
