import React, {forwardRef, useEffect} from 'react';
import {
  Form as FormilyForm, FormItem as AntFormItem, Submit,
  Reset,
  FormButtonGroup
} from '@formily/antd';

import {MegaLayout as antMegaLayout} from '@formily/antd-components';
import useRequest from '@/util/Request/useRequest';
import {SkeletonForm} from '@/components/Skeleton';

import style from './index.module.less';

const Form = ({children, labelCol, wrapperCol, api, fieldKey, id, formatResult,onSuccess}, ref) => {

  // console.log(fieldKey);
  const key = {};
  key[fieldKey] = id;

  const {run: find, data: findData, loading: findLoad} = useRequest(api.view, {
    manual: true,
    formatResult:(response)=>{
      if (!response.data) {
        return {};
      }
      if(typeof formatResult==='function'){
        return formatResult(response.data);
      }
      return response.data;
    }
  });

  useEffect(() => {
    if (id) {
      find({params: key});
    }
    return () => {

    };
  }, [id]);

  if (findLoad) {
    return (
      <SkeletonForm/>
    );
  }

  return (
    <FormilyForm
      className={style.formWarp}
      labelCol={labelCol || 6}
      wrapperCol={wrapperCol || 18}
      onSubmit={(values) => {
        console.log(values);
      }}
      initialValues={findData}
    >
      {children}
      <FormButtonGroup offset={6}>
        <Submit>保存</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormilyForm>
  );
};

const forwardRefForm = forwardRef(Form);

forwardRefForm.FormItem = AntFormItem;
forwardRefForm.MegaLayout = antMegaLayout;

export default forwardRefForm;
