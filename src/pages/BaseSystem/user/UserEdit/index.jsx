import React from 'react';
import Form from "@/components/Form";
import {DatePicker, Input, Radio} from 'antd';
import {getUserInfo, userAdd, userSave} from "@/Config/ApiUrl/system/user";
import moment from "moment";
import {deptTree} from "@/Config/ApiUrl/system/dept";
import {roleList, roleTree} from "@/Config/ApiUrl/system/role";
import Select from "@/components/Select";
import TreeSelect from "@/components/TreeSelect";
import {positionAllList} from "@/Config/ApiUrl/system/position";

const {FormItem} = Form;

const UserEdit = (props) => {
  let password = '';

  const {value} = props;

  const checkPWD = (field, value, callback) => {
    switch (field.field) {
      case 'password':
        password = value;
        if (password.length < 6) {
          callback(new Error('密码长度必须大于6位'));
        }
        break;
      case 'rePassword':
        if (value !== password) {
          callback(new Error('两次密码输入不一致'));
        }
        break;
      default:
        break;
    }
    callback();
  }

  return (
    <Form
      api={
        {
          view: getUserInfo,
          save: userSave,
          add: userAdd
        }
      }
      formatResult={(values) => {
        const result = {
          ...values,
          birthday: moment(values.birthday, "YYYY-MM-DD")
        }
        return result;
      }}
      onSubmit={(values) => {
        const result = {
          ...values,
          position: values.positionIds ? values.positionIds.join(',') : ''
        }
        return result;
      }}
      {...props}
    >
      <FormItem component={Input} label="账号" required placeholder="请输入账号" name="account"/>
      <FormItem component={Input} label="姓名" required placeholder="请输入姓名" name="name"/>
      <FormItem label="生日" name="birthday" component={DatePicker}/>
      {value === false &&
      <FormItem label="密码" required component={Input.Password}
                placeholder="请输入密码"
                name="password"/>}
      {value === false &&
      <FormItem label="重复密码" required component={Input.Password}
                placeholder="请输入重复密码" name="rePassword"/>}
      <FormItem component={Input} label="邮箱" required placeholder="请输入邮箱" name="email"/>
      <FormItem label="性别" name="sex" component={Radio.Group} options={[
        {label: '男', value: 'M'},
        {label: '女', value: 'F'},
      ]}/>
      <FormItem component={TreeSelect} api={deptTree} label="部门" required name="deptId"/>
      <FormItem component={Select} api={positionAllList} label="职位" required name="positionIds" mode="multiple"/>
    </Form>
  );
}

export default UserEdit;

