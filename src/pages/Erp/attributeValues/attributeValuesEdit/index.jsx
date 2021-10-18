/**
 * 产品属性数据表编辑页
 *
 * @author song
 * @Date 2021-10-18 11:30:54
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {attributeValuesDetail, attributeValuesAdd, attributeValuesEdit} from '../attributeValuesUrl';
import * as SysField from '../attributeValuesField';

const {FormItem} = Form;

const ApiConfig = {
  view: attributeValuesDetail,
  add: attributeValuesAdd,
  save: attributeValuesEdit
};

const AttributeValuesEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="attributeValuesId"
    >
      <FormItem label="选择属性" name="attributeId" component={SysField.Difference} required/>
      <FormItem label="值" name="attributeValues" component={SysField.Number} required/>
    </Form>
  );
};

export default AttributeValuesEdit;
