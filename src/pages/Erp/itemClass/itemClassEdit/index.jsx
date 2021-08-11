/**
 * 产品分类表编辑页
 *
 * @author cheng
 * @Date 2021-08-11 15:37:57
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {itemClassDetail, itemClassAdd, itemClassEdit} from '../itemClassUrl';
import * as SysField from '../itemClassField';

const {FormItem} = Form;

const ApiConfig = {
  view: itemClassDetail,
  add: itemClassAdd,
  save: itemClassEdit
};

const ItemClassEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="classId"
    >
      <FormItem label="产品分类名称" name="className" component={SysField.ClassName}
        rules= {[{ required: true, message: '请输入产品分类名称!' }]}
        required/>
    </Form>
  );
};

export default ItemClassEdit;
