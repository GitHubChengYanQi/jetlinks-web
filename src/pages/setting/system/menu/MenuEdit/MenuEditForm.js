import React, {useRef} from 'react';
import {Form, Input} from '@alifd/next';

import Editform from '@/components/Editform';
import {menuAdd, menuSave, menuView} from '@/Config/ApiUrl/system/menu';
import ItemWapper from '@/components/ItemWapper';
import MenuSelect from '@/pages/setting/system/menu/MenuSelect';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
};

const constValue = {
  name: '',
  code: '',
  pid: '',
  url: '',
  sort: '',
};

const ApiConfig = {
  View: menuView,
  Add: menuAdd,
  Save: menuSave
}

const MenuEditForm = ({id, ...other}) => {

  const formRef = useRef();

  return (
    <Editform
      constValue={constValue}
      formItemLayout={formItemLayout}
      fieldKey="menuId"
      id={id}
      ApiConfig={ApiConfig}
      ref={formRef}
      {...other} >

      <FormItem {...formItemLayout} label="名称" required requiredMessage="请输入名称">
        <Input placeholder="请输入名称" name="name"/>
      </FormItem>
      <FormItem {...formItemLayout} label="编码" required requiredMessage="请输入编码">
        <Input placeholder="请输入编码" name="code"/>
      </FormItem>
      <FormItem {...formItemLayout} label="上级" required requiredMessage="请选择上级权限">
        <ItemWapper ItemNode={MenuSelect} placeholder="请选择上级权限" name="pid"/>
      </FormItem>
      <FormItem {...formItemLayout} label="请求地址" required requiredMessage="请输入请求地址">
        <Input placeholder="请输入请求地址" name="url"/>
      </FormItem>
      <FormItem {...formItemLayout} wrapperCol={{span: 5}} label="排序">
        <Input placeholder="请输入数字" name="sort"/>
      </FormItem>

    </Editform>
  );
}
export default MenuEditForm;