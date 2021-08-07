# 表单页面

```jsx
import React, {useRef} from 'react';
import {Card, Form, Input, Radio, DatePicker } from '@alifd/next';
import DeptSelect from '@/pages/setting/system/dept/DeptSelect';
import ItemWapper from '@/components/ItemWapper';
import PositionSelect from '@/pages/setting/system/position/PositionSelect';
import Editform from '@/components/Editform';
import {getUserInfo, userAdd, userSave} from '@/Config/ApiUrl/system/user';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
};

const constValue = {
  account: '',
  name: '',
  birthday: '',
  password: '',
  rePassword: '',
  sex: 'M',
  deptId: '',
  position: null,
  email: ''
};

const ApiConfig = {
  View: getUserInfo,
  Add: userAdd,
  Save: userSave
}
let password = '';
const ${COMPONENT_NAME} = ({id, ...other}) => {

  const formRef = useRef();

  const checkPWD = (field, value, callback) => {
    switch (field.
      field) {
      case 'password':
        password = value;
        if(password.length<6){
          callback(new Error('密码长度必须大于6位'));
        }
        break;
      case 'rePassword':
        if(value!==password){
          callback(new Error('两次密码输入不一致'));
        }
        break;
      default:
        break;
    }
    callback();
  }

  return (
    <Editform
      constValue={constValue}
      formItemLayout={formItemLayout}
      fieldKey="userId" id={id}
      ApiConfig={ApiConfig}
      ref={formRef}
      {...other} >
      <Card contentHeight='auto' className='edit-block'>
        <Card.Header title={<h6>基础信息</h6>}/>
        <Card.Content className='topLine'>
          <FormItem {...formItemLayout} label="账号" required requiredMessage="请输入账号">
            <Input placeholder="请输入账号" name="account"/>
          </FormItem>
          <FormItem {...formItemLayout} label="姓名" required requiredMessage="请输入姓名">
            <Input placeholder="请输入姓名" name="name"/>
          </FormItem>
          <FormItem {...formItemLayout} label="生日">
            <DatePicker name="birthday"/>
          </FormItem>
          {id === 0 && <FormItem {...formItemLayout} label="密码" required validator={checkPWD} requiredMessage="请输入密码">
            <Input.Password placeholder="请输入密码" name="password"/>
          </FormItem>}
          {id === 0 &&
          <FormItem {...formItemLayout} label="重复密码" required validator={checkPWD} requiredMessage="请输入重复密码">
            <Input.Password placeholder="请输入重复密码" name="rePassword"/>
          </FormItem>}
          <FormItem {...formItemLayout} label="邮箱" required requiredMessage="请输入邮箱">
            <Input placeholder="请输入邮箱" name="email"/>
          </FormItem>
          <FormItem {...formItemLayout} label="性别">
            <RadioGroup name="sex">
              <Radio value="M">男</Radio>
              <Radio value="F">女</Radio>
            </RadioGroup>
          </FormItem>
        </Card.Content>
      </Card>
      <Card contentHeight='auto' className='edit-block'>
        <Card.Header title={<h6>职务信息</h6>}/>
        <Card.Content className='topLine'>
          <FormItem {...formItemLayout} label="部门" required requiredMessage="请选择部门">
            <ItemWapper ItemNode={DeptSelect} placeholder="请选择部门" name="deptId"/>
          </FormItem>
          <FormItem {...formItemLayout} label="职位" required requiredMessage="请选择职位">
            <ItemWapper ItemNode={PositionSelect} placeholder="请选择职位" name="position"/>
          </FormItem>
        </Card.Content>
      </Card>
    </Editform>
  );
}

export default ${COMPONENT_NAME};
```
