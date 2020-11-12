import React, {useRef} from 'react';
import {menuAdd, menuSave, menuTree, menuView} from '@/Config/ApiUrl/system/menu';
import Form from '@/components/Form';
import {Input} from 'antd';
import Cascader from '@/components/Cascader';
import SelectIcon from '@/components/SelectIcon';

const {FormItem} = Form;

const ApiConfig = {
  view: menuView,
  add: menuAdd,
  save: menuSave
};

const MenuEdit = ({id, ...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      id={id}
      fieldKey="menuId"
    >
      <FormItem label="名称" name="name" component={Input}/>
      <FormItem label="编码" name="code" component={Input}/>
      <FormItem label="上级" name="pcodes" component={Cascader} allowClear={false} api={menuTree}/>
      <FormItem label="图标" name="url" component={SelectIcon}/>
      <FormItem label="请求地址" name="url" component={Input}/>
      <FormItem label="排序" name="sort" component={Input}/>
    </Form>
  );
};

export default MenuEdit;
