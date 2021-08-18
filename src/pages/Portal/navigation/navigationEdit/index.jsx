/**
 * 导航表编辑页
 *
 * @author
 * @Date 2021-08-18 08:40:30
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {navigationDetail, navigationAdd, navigationEdit} from '../navigationUrl';
import * as SysField from '../navigationField';
import {Sort} from '../navigationField';

const {FormItem} = Form;

const ApiConfig = {
  view: navigationDetail,
  add: navigationAdd,
  save: navigationEdit
};

const NavigationEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="navigationId"
    >
      <FormItem label="标题" name="title" component={SysField.Title} required/>
      <FormItem label="图标" name="icon" component={SysField.Icon} required/>
      <FormItem label="排序" name="sort" component={SysField.Sort} required/>
      <FormItem label="链接" name="link" component={SysField.Link} required/>
      <FormItem label="分类" name="difference" component={SysField.Difference} required/>
    </Form>
  );
};

export default NavigationEdit;
