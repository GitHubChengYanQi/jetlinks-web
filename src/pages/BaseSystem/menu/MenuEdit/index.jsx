import React, {useRef} from 'react';
import {menuAdd, menuSave, menuView} from '@/Config/ApiUrl/system/menu';
import Form from '@/components/Form';
import {Input} from 'antd';
import MenuSelect from '@/pages/BaseSystem/menu/MenuSelect';

const {FormItem} = Form;

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
  view: menuView,
  add: menuAdd,
  save: menuSave
};

const MenuEdit = ({id, ...props}) => {

  const formRef = useRef();

  return (
    <Form {...props} ref={formRef} api={ApiConfig} id={id} fieldKey="menuId">
      <FormItem label="名称" name="name" component={Input}/>
      <FormItem label="编码" name="code" component={Input}/>
      <FormItem label="上级" name="pid" component={MenuSelect}/>
      <FormItem label="请求地址" name="url" component={Input}/>
      <FormItem label="排序" name="sort" component={Input}/>
    </Form>
  );
};

export default MenuEdit;
