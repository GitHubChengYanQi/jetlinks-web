/**
 * 编辑页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {spuDetail, spuAdd, spuEdit} from '../spuUrl';
import * as SysField from '../spuField';

const {FormItem} = Form;

const ApiConfig = {
  view: spuDetail,
  add: spuAdd,
  save: spuEdit
};

const SpuEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="spuId"
    >
      <FormItem label="类目" name="categoryId" component={SysField.CategoryId} required/>
      <FormItem label="物品名字" name="name" component={SysField.Name} required/>
    </Form>
  );
};

export default SpuEdit;
