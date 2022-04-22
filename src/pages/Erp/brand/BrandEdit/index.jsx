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

  const {noSku, ...other} = props;

  const formRef = useRef();


  return (
    <>
      <Form
        {...other}
        ref={formRef}
        formActions={formActionsPublic}
        api={ApiConfig}
        fieldKey="brandId"
        onSubmit={(value) => {
          if (value.skuIds) {
            value.skuIds = value.skuIds.map((item) => {
              return item.skuId;
            });
          }
          return value;

        }}
      >
        <FormItem
          label="品牌名称"
          name="brandName"
          component={SysField.BrandName}
          rules={[{required: true, message: '请输入品牌名称!'}]}
          required />
        {!noSku && <FormItem
          name="skuIds"
          component={SysField.AddSku}
          required />}
      </Form>

    </>
  );
};

export default BrandEdit;
