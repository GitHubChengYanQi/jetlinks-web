/**
 * 物品分类表编辑页
 *
 * @author
 * @Date 2021-10-18 10:54:16
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {categoryDetail, categoryAdd, categoryEdit} from '../categoryUrl';
import * as SysField from '../categoryField';

const {FormItem} = Form;

const ApiConfig = {
  view: categoryDetail,
  add: categoryAdd,
  save: categoryEdit
};

const CategoryEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="categoryId"
    >
      <FormItem label="上级类目" name="pid" component={SysField.Pid} required/>
      <FormItem label="物品类目名称" name="categoryName" component={SysField.CategoryName} required/>
      <FormItem label="排序" name="sort" component={SysField.Scort} required/>
    </Form>
  );
};

export default CategoryEdit;
