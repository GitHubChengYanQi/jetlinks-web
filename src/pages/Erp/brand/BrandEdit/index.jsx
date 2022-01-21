/**
 * 品牌表编辑页
 *
 * @author
 * @Date 2021-07-14 14:19:04
 */

import React, {useRef} from 'react';
import {createFormActions} from '@formily/antd';
import Form from '@/components/Form';
import {brandDetail, brandAdd, brandEdit} from '../BrandUrl';
import * as SysField from '../BrandField';

const {FormItem} = Form;

const formActionsPublic = createFormActions();

const ApiConfig = {
  view: brandDetail,
  add: brandAdd,
  save: brandEdit
};

const BrandEdit = ({...props}) => {


  const formRef = useRef();



  return (
    <>
      <Form
        {...props}
        ref={formRef}
        formActions={formActionsPublic}
        api={ApiConfig}
        fieldKey="brandId"
      >
        <FormItem label="品牌名称" name="brandName" component={SysField.BrandName}
          rules={[{ required: true, message: '请输入品牌名称!' }]}
          required/>
      </Form>

    </>
  );
};

export default BrandEdit;
