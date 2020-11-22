import React from 'react';
import Form from "@/components/Form";
import Tree from "@/components/Tree";
import {roleListByUserId, roleTree, roleTreeList} from "@/Config/ApiUrl/system/role";
import {userRoleSave} from "@/Config/ApiUrl/system/user";

const ApiConfig = {
  view: roleListByUserId,
  add: {},
  save: userRoleSave
};
const {FormItem} = Form;
const UserRole = (props)=>{

  return (
    <Form
      api={ApiConfig}
      onSubmit={(values) => {
        const result = {
          ...values,
          roleIds: values.checked.join(',')
        }
        return result;
      }}
      {...props}
    >
      <FormItem label="" required component={Tree} api={roleTreeList} name="checked"/>
    </Form>
  );
};

export default UserRole;
