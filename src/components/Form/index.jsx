import React, {forwardRef} from 'react';
import {
  Form as FormilyForm, FormItem as AntFormItem, Submit,
  Reset,
  FormButtonGroup
} from '@formily/antd';

import {MegaLayout as antMegaLayout} from '@formily/antd-components';
import useRequest from "@/util/Request/useRequest";


const Form = ({children, labelCol, wrapperCol, api, fieldKey,id, onSuccess}, ref) => {

  // console.log(fieldKey);
  const key = {};
  key[fieldKey] = id;
  console.log(key);
  const {run:find} = useRequest(api.view,{
    initialData:{
      params:key,
      data:key
    },
    defaultParams:{
      params:key,
      data:key
    }
  });

  return (
    <FormilyForm
      labelCol={labelCol || 6}
      wrapperCol={wrapperCol || 18}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {children}
      <FormButtonGroup offset={6}>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormilyForm>
  );
};

const forwardRefForm = forwardRef(Form);

forwardRefForm.FormItem = AntFormItem;
forwardRefForm.MegaLayout = antMegaLayout;

export default forwardRefForm;
