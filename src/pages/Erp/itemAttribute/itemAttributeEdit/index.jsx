/**
 * 产品属性表编辑页
 *
 * @author song
 * @Date 2021-10-18 11:28:39
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {itemAttributeDetail, itemAttributeAdd, itemAttributeEdit} from '../itemAttributeUrl';
import * as SysField from '../itemAttributeField';
import {createFormActions} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: itemAttributeDetail,
  add: itemAttributeAdd,
  save: itemAttributeEdit
};

const formActionsPublic = createFormActions();

const ItemAttributeEdit = ({...props}) => {

  const {categoryId,...other} = props;

  const formRef = useRef();

  return (
    <Form
      {...other}
      ref={formRef}
      formActions={formActionsPublic}
      api={ApiConfig}
      fieldKey="attributeId"
      onSubmit={(value)=>{
        return {...value,categoryId};
      }}
    >
      <FormItem label="属性名称" name="attribute" component={SysField.attribute} required/>
      <FormItem label="标配" name="standard" component={SysField.Standard} required/>
      <FormItem label='排序' name="sort" component={SysField.Scort} required/>
    </Form>
  );
};

export default ItemAttributeEdit;
