/**
 * 物品分类表编辑页
 *
 * @author
 * @Date 2021-10-18 10:54:16
 */

import React, {useRef} from 'react';
import * as SysField from '../categoryField';
import {categoryDetail, categoryAdd, categoryEdit} from '../categoryUrl';
import Form from '@/components/Form';
import {createFormActions} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: categoryDetail,
  add: categoryAdd,
  save: categoryEdit
};
const formActionsPublic = createFormActions();

const CategoryEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      formActions={formActionsPublic}
      ref={formRef}
      api={ApiConfig}
      fieldKey="categoryId"
    >
      <FormItem label="上级配置" name="pid" component={SysField.Pid} required />
      <FormItem label="配置名称" name="categoryName" component={SysField.CategoryName} required />
      <FormItem label="排序" name="sort" component={SysField.Scort} required />
    </Form>
  );
};

export default CategoryEdit;
