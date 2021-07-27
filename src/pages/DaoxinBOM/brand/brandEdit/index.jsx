/**
 * 品牌表编辑页
 *
 * @author
 * @Date 2021-07-14 14:19:04
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {brandDetail, brandAdd, brandEdit} from '../brandUrl';
import * as SysField from '../brandField';

const {FormItem} = Form;

const ApiConfig = {
  view: brandDetail,
  add: brandAdd,
  save: brandEdit
};

const BrandEdit = ({...props}) => {



  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="brandId"
    >
      <FormItem label="品牌名称" name="brandName" component={SysField.BrandName} required/>
    </Form>
  );
};

export default BrandEdit;
