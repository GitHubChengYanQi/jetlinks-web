/**
 * 操作日志编辑页
 *
 * @author 
 * @Date 2021-11-05 11:42:40
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {operationLogDetail, operationLogAdd, operationLogEdit} from '../operationLogUrl';
import * as SysField from '../operationLogField';

const {FormItem} = Form;

const ApiConfig = {
  view: operationLogDetail,
  add: operationLogAdd,
  save: operationLogEdit
};

const OperationLogEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="operationLogId"
    >
      <FormItem label="日志类型(字典)" name="logType" component={SysField.LogType} required/>
      <FormItem label="日志名称" name="logName" component={SysField.LogName} required/>
      <FormItem label="用户id" name="userId" component={SysField.UserId} required/>
      <FormItem label="类名称" name="className" component={SysField.ClassName} required/>
      <FormItem label="方法名称" name="method" component={SysField.Method} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="是否成功(字典)" name="succeed" component={SysField.Succeed} required/>
      <FormItem label="备注" name="message" component={SysField.Message} required/>
    </Form>
  );
};

export default OperationLogEdit;
