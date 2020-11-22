import React from 'react';
import Form from '@/components/Form';
import {roleSet, roleSetView} from '@/Config/ApiUrl/system/role';
import Tree from "@/components/Tree";
import {menuTreeNow} from "@/Config/ApiUrl/system/menu";

const {FormItem} = Form;

const ApiConfig = {
  view: roleSetView,
  add: {},
  save: roleSet
};

const RoleSet = ({...props}) => {

  return (
    <Form
      api={ApiConfig}
      onSubmit={(values) => {
        const result = {
          ...values,
          ids: values.checked.join(',')
        }
        return result;
      }}
      {...props}
    >
      <FormItem label="" required component={Tree} api={menuTreeNow} name="checked"/>
    </Form>
  );
};

export default RoleSet;
