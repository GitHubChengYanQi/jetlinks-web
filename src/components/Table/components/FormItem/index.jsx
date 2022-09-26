import React from 'react';
import Form from '@/components/Form';

const {FormItem: AntFormItem} = Form;

const FormItem = (
  {
    select = false,
    label = '',
    name,
    component,
    children,
    initialValue,
    placeholder,
    noLabel,
    ...porps
  }
) => {

  return <AntFormItem
    initialValue={initialValue}
    label={noLabel ? null : label}
    name={name}
    component={component || children}
    placeholder={placeholder || `请${select ? '选择' : '输入'}${label}`}
    {...porps}
  />;
};

export default FormItem;
