import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
  Form as FormilyForm, FormItem as AntFormItem, Submit,
  Reset,
  FormButtonGroup, createFormActions,
} from '@formily/antd';
import {MegaLayout as antMegaLayout} from '@formily/antd-components';
import useRequest from '@/util/Request/useRequest';
import {SkeletonForm} from '@/components/Skeleton';
import {message} from 'antd';

import style from './index.module.less';

const formActions = createFormActions();

const FormWrapper = (
  {
    success,
    children,
    labelCol,
    wrapperCol,
    api,
    effects,
    fieldKey,
    value,
    formatResult,
    onSubmit = (values) => {
      return values;
    },
    onSuccess = () => {

      }
    ,
    onError = () => {
    },
    ...props
  }, ref) => {
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const key = {};

  if (value && (!api.view || !api.save)) {
    throw new Error('Table component: api.view,api.save cannot be empty,But now it doesn\'t exist!');
  }
  if (value === false && !api.add) {
    throw new Error('Table component: api.add cannot be empty,But now it doesn\'t exist!');
  }
  if (!fieldKey && api.view) {
    fieldKey = api.view.rowKey;
  }


  if (value) {
    key[fieldKey] = value;
  }

  const [findData, setFindData] = useState(undefined);
  // 获取数据
  const {run: find, loading: findLoad, mutate} = useRequest(api.view, {
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
    },
    onSuccess: (reslut) => {
      setFindData(reslut);
    }
  });

  const saveURI = value ? api.save : api.add;
  // 提交数据
  const {run: save, loading: saveLoad} = useRequest(saveURI, {
    manual: true,
    formatResult: (response) => {
      return response;
    },
    onSuccess: (result) => {
      success(result);
      // onSuccess(result);
    },
    onError: (error) => {
      message.error(error.message);
    }
  });


  useImperativeHandle(ref, () => ({
    ...formActions,
  }));

  useEffect(() => {
    if (value) {
      if (!fieldKey) {
        throw new Error('Table component: fieldKey cannot be empty,But now it doesn\'t exist!');
      }
      find({params: key,data:key});
    } else if (value === false) {
      setFindData({});
    }
    return () => {
      setFindData(undefined);
    };
  }, [value]);

  // || value===null || typeof value==='undefined'
  if (findLoad) {
    return (
      <SkeletonForm/>
    );
  }

  return findData && <FormilyForm
    effects={()=>{
      effects ? effects() : null;
    }}
    actions={formActions}
    className={style.formWarp}
    labelCol={labelCol || 6}
    wrapperCol={wrapperCol || 15}
    onSubmit={async (values) => {
      const submitValues = onSubmit(values);
      if (submitValues === false) {
        return false;
      }
      return await save(
        {
          data: {
            ...submitValues,
            ...key
          }
        }
      );
    }}
    initialValues={findData}
    {...props}
  >

    {children}
  </FormilyForm>;
};

const FormIndex = forwardRef(FormWrapper);

FormIndex.FormItem = AntFormItem;
FormIndex.MegaLayout = antMegaLayout;

export default FormIndex;
