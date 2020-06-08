import React from 'react';
import {Card, Form, Input} from '@alifd/next';
import ItemWapper from '@/components/ItemWapper';

import Editform from '@/components/Editform';
import DeptSelect from '@/pages/setting/system/dept/DeptSelect';
import {deptAdd, deptSave, deptView} from '@/Config/ApiUrl/system/dept';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
};

const constValue = {
  simpleName: '',
  pid: '',
  fullName: '',
  description: '',
  sort: ''
};

const ApiConfig = {
  Add: deptAdd,
  Save: deptSave,
  View: deptView,
}

const DeptEditForm = (props) => {
  return (
    <Editform
      constValue={constValue}
      formItemLayout={formItemLayout}
      fieldKey="deptId"
      ApiConfig={ApiConfig}
      {...props}
    >
      <Card contentHeight='auto' className='edit-block'>
        <Card.Content>
          <FormItem {...formItemLayout} label="名称" required requiredMessage="请输入名称">
            <Input placeholder="请输入名称" name="simpleName"/>
          </FormItem>
          <FormItem {...formItemLayout} label="上级部门" required requiredMessage="请选择上级部门">
            <ItemWapper placeholder="请选择上级部门" name="pid" ItemNode={DeptSelect}/>
          </FormItem>
          <FormItem {...formItemLayout} label="别名" required requiredMessage="请输入别名">
            <Input placeholder="请输入别名" name="fullName"/>
          </FormItem>
          <FormItem {...formItemLayout} label="备注" requiredMessage="请输入备注">
            <Input placeholder="请输入备注" name="description"/>
          </FormItem>
          <FormItem {...formItemLayout} wrapperCol={{span: 5}} label="排序">
            <Input placeholder="排序" name="sort"/>
          </FormItem>
        </Card.Content>
      </Card>
    </Editform>
  );
}

export default DeptEditForm;