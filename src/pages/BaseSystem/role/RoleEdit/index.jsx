import React from 'react';
import Form from '@/components/Form';
import {roleAdd, roleSave, roleTree, roleView} from '@/Config/ApiUrl/system/role';
import {Input} from 'antd';
import Cascader from '@/components/Cascader';

const {FormItem} = Form;

const ApiConfig = {
  view: roleView,
  add: roleAdd,
  save: roleSave
};

const RoleEdit = ({...props}) => {

  return (
    <Form
      api={ApiConfig}
      fieldKey="roleId"
      onSubmit={(values) => {
        if (Array.isArray(values.pids) && values.pids.length > 0) {
          values.pid = values.pids[values.pids.length - 1];
        }
        return values;
      }}
      {...props}
    >
      <FormItem label="名称" required component={Input} placeholder="请输入名称" name="name"/>
      <FormItem label="上级" required component={Cascader} api={roleTree} placeholder="请选择上级角色" name="pids"/>
      <FormItem label="别名" required component={Input} placeholder="请输入别名" name="description"/>
      <FormItem label="排序" component={Input} placeholder="排序" name="sort"/>
    </Form>
  );
};

export default RoleEdit;
