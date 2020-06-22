import React, {useRef} from 'react';
import {Card, Form, Input} from '@alifd/next';
import ItemWapper from '@/components/ItemWapper';
import RoleSelect from '@/pages/setting/system/role/RoleSelect';
import {roleAdd, roleSave, roleView} from '@/Config/ApiUrl/system/role';
import EditForm from '@/components/Editform';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
};

const constValue = {
  name: '',
  pid: '',
  description: '',
  sort: ''
};

const ApiConfig = {
  View: roleView,
  Add: roleAdd,
  Save: roleSave
}

const RoleEditForm = ({id, ...other}) => {
  const formRef = useRef();

  return (

    <EditForm
      constValue={constValue}
      formItemLayout={formItemLayout}
      fieldKey="roleId"
      id={id}
      ApiConfig={ApiConfig}
      ref={formRef}
      {...other}
    >
      <Card contentHeight='auto' className='edit-block'>
        <Card.Content>
          <FormItem {...formItemLayout} label="名称" required requiredMessage="请输入名称">
            <Input placeholder="请输入名称" name="name"/>
          </FormItem>
          <FormItem {...formItemLayout} label="上级角色" required requiredMessage="请选择上级角色">
            <ItemWapper placeholder="请选择上级角色" name="pid" ItemNode={RoleSelect}/>
          </FormItem>
          <FormItem {...formItemLayout} label="别名" required requiredMessage="请输入别名">
            <Input placeholder="请输入别名" name="description"/>
          </FormItem>
          <FormItem {...formItemLayout} wrapperCol={{span: 5}} label="排序">
            <Input placeholder="排序" name="sort"/>
          </FormItem>
        </Card.Content>
      </Card>
    </EditForm>
  );
}

export default RoleEditForm;