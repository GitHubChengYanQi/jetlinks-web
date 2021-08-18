/**
 * 轮播图分类编辑页
 *
 * @author
 * @Date 2021-08-18 10:38:50
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {bannerDifferenceDetail, bannerDifferenceAdd, bannerDifferenceEdit} from '../bannerDifferenceUrl';
import * as SysField from '../bannerDifferenceField';

const {FormItem} = Form;

const ApiConfig = {
  view: bannerDifferenceDetail,
  add: bannerDifferenceAdd,
  save: bannerDifferenceEdit
};

const BannerDifferenceEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="classificationId"
    >
      <FormItem label="轮播图分类名称" name="difference" component={SysField.Difference} required/>
    </Form>
  );
};

export default BannerDifferenceEdit;
