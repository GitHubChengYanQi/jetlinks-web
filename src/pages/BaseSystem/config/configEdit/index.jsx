/**
 * 参数配置编辑页
 *
 * @author 
 * @Date 2021-10-20 10:50:00
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {configDetail, configAdd, configEdit} from '../configUrl';
import * as SysField from '../configField';

const {FormItem} = Form;

const ApiConfig = {
  view: configDetail,
  add: configAdd,
  save: configEdit
};

const ConfigEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="id"
    >
      <FormItem label="名称" name="name" component={SysField.Name} required/>
      <FormItem label="属性编码标识" name="code" component={SysField.Code} required/>
      <FormItem label="是否是字典中的值" name="dictFlag" component={SysField.DictFlag} required/>
      <FormItem label="字典类型的编码" name="dictTypeId" component={SysField.DictTypeId} required/>
      <FormItem label="属性值，如果是字典中的类型，则为dict的code" name="value" component={SysField.Value} required/>
      <FormItem label="备注" name="remark" component={SysField.Remark} required/>
    </Form>
  );
};

export default ConfigEdit;
