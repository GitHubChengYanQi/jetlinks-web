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

const FormWrapper = (
  {
    children,
    labelCol,
    wrapperCol,
    api,
    fieldKey,
    value,
    formatResult,
    onSubmit = (values) => {
      return values;
    },
    onSuccess = () => {
    },
    onError = () => {
    }
  }, ref) => {

  if (!api || !api.view) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  if (!fieldKey) {
    fieldKey = api.view.rowKey;
  }

  const key = {};
  key[fieldKey] = value;

  // 获取数据
  const {run: find, data: findData, loading: findLoad} = useRequest(api.view, {
    manual: true,
    onError: (error) => {
      onError(error);
    },
    formatResult: (response) => {
      if (!response.data) {
        return {};
      }
      if (typeof formatResult === 'function') {
        return formatResult(response.data);
      }
      return response.data;
    }
  });

  // 提交数据
  const {run: save, loading: saveLoad} = useRequest(api.save, {
    manual: true,
    formatResult: (response) => {
      return response;
    },
    onSuccess: (result) => {
      onSuccess(result);
    }
  });

  useEffect(() => {
    if (value) {
      if (!fieldKey) {
        throw new Error('Table component: fieldKey cannot be empty,But now it doesn\'t exist!');
      }
      find({params: key});
    }
    return () => {

    };
  }, [value]);

  if (findLoad) {
    return (
      <SkeletonForm/>
    );
  }

  return (
    <FormilyForm
      className={style.formWarp}
      labelCol={labelCol || 6}
      wrapperCol={wrapperCol || 15}
      onSubmit={(values) => {
        values = onSubmit(values);
        save({data: values});
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

const Form = forwardRef(FormWrapper);

Form.FormItem = AntFormItem;
Form.MegaLayout = antMegaLayout;

export default Form;
