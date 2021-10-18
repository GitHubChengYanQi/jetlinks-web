/**
 * 产品属性表编辑页
 *
 * @author song
 * @Date 2021-10-18 11:28:39
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {itemAttributeDetail, itemAttributeAdd, itemAttributeEdit} from '../itemAttributeUrl';
import * as SysField from '../itemAttributeField';

const {FormItem} = Form;

const ApiConfig = {
  view: itemAttributeDetail,
  add: itemAttributeAdd,
  save: itemAttributeEdit
};

const ItemAttributeEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="attributeId"
    >
      <FormItem label="产品名称" name="itemId" component={SysField.Version} required/>
      <FormItem label="属性名称" name="attribute" component={SysField.attribute} required/>
    </Form>
  );
};

export default ItemAttributeEdit;
