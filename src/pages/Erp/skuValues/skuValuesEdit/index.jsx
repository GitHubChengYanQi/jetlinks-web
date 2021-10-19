/**
 * sku详情表编辑页
 *
 * @author 
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {skuValuesDetail, skuValuesAdd, skuValuesEdit} from '../skuValuesUrl';
import * as SysField from '../skuValuesField';

const {FormItem} = Form;

const ApiConfig = {
  view: skuValuesDetail,
  add: skuValuesAdd,
  save: skuValuesEdit
};

const SkuValuesEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="skuDetailId"
    >
      <FormItem label="" name="skuId" component={SysField.SkuId} required/>
      <FormItem label="属性Id" name="attributeId" component={SysField.AttributeId} required/>
      <FormItem label="属性值id" name="attributeValuesId" component={SysField.AttributeValuesId} required/>
    </Form>
  );
};

export default SkuValuesEdit;
