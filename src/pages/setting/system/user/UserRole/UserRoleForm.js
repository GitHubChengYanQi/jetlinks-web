import React from 'react';
import {Card, Form,} from '@alifd/next';
import ItemWapper from '@/components/ItemWapper';
import {roleAdd, roleSave, roleTree, roleView} from '@/Config/ApiUrl/system/role';
import Editform from '@/components/Editform';
import RoleTree from '@/pages/setting/system/role/RoleTree';
import {userRoleSave} from '@/Config/ApiUrl/system/user';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
};

const constValue = {
  roleIds: '',
};

const ApiConfig = {
  View: roleTree,
  Save: userRoleSave
}
const UserRoleForm = ({id, ...other}) => {

  return (
    <Editform
      constValue={constValue}
      formItemLayout={formItemLayout}
      fieldKey="userId"
      id={id}
      ApiConfig={ApiConfig}
      {...other}
      onLoad={(data) => {
        const roleIds = data.filter((item) => {
          return item.checked === true;
        }).map((item) => {
          return item.value;
        });
        return {roleIds};
      }}
      onSubmit={(value) => {
        return value;
        // return {
        //   userId: id,
        //   roleIds: value.roleIds,
        // }
      }}
    >
      <Card contentHeight='auto' className='edit-block'>
        <Card.Content>
          <FormItem {...formItemLayout} required>
            <ItemWapper ItemNode={RoleTree} name="roleIds"/>
          </FormItem>
        </Card.Content>
      </Card>

    </Editform>

  );
}

export default UserRoleForm;