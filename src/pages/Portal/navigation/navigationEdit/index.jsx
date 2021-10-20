/**
 * 导航表编辑页
 *
 * @author
 * @Date 2021-08-18 08:40:30
 */

import React, {useRef, useState} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {navigationDetail, navigationAdd, navigationEdit} from '../navigationUrl';
import * as SysField from '../navigationField';
import {Class, Sort} from '../navigationField';
import {createFormActions, FormEffectHooks} from '@formily/antd';
import {useRequest} from '@/util/Request';

const {FormItem} = Form;

const ApiConfig = {
  view: navigationDetail,
  add: navigationAdd,
  save: navigationEdit
};

const {onFieldValueChange$} = FormEffectHooks;

const NavigationEdit = ({...props}) => {

  const formRef = useRef();

  const [visiable, setVisable] = useState();

  // const {run:add} = useRequest

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="navigationId"
      effect={() => {
        onFieldValueChange$('link').subscribe(({value}) => {
          if (value === '/pages/Data/index') {
            setVisable(true);
          }else {
            setVisable(false);
          }
        });
      }}
      onSubmit={(value)=>{
        if (value.content){
          value = {
            ...value,
            link:`/pages/Data/Detail/index?id=${value.content}`
          };
        }
        return value;
      }}
    >
      <FormItem label="标题" name="title" component={SysField.Title} required />
      <FormItem label="图标" name="icon" component={SysField.Icon} required />
      <FormItem label="排序" name="sort" component={SysField.Sort} required />
      <FormItem label="链接" initialValue={false} name="link" component={SysField.Link} required />


      {visiable && <>
        <FormItem label="选择产品" name="content" component={SysField.Content}  />
      </>}
      <FormItem label="分类" name="difference" component={SysField.Difference} required />
    </Form>
  );
};

export default NavigationEdit;
