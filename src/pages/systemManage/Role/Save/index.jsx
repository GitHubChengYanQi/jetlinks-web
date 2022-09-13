import React from 'react';
import {Form, Input, Radio} from 'antd';
import Tree from '@/components/Tree';
import {roleAdd, roleSave} from '@/Config/ApiUrl/system/role';
import {menuTreeNow} from '@/Config/ApiUrl/system/menu';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';
import AntForm from '@/components/AntForm';
import store from '@/store';
import {isArray} from '@/util/Tools';


const Save = ({
  visible,
  close = () => {
  },
  data = {},
  success = () => {
  }
}) => {

  const [userInfo] = store.useModel('user');
  console.log(userInfo.menus);

  const formatData = (data) => {
    return isArray(data).map(item => {
      return {
        key: item,
        title: item,
        children: formatData(item.subMenus),
      };
    });
  };

  return (
    <AntForm
      apis={{
        add: roleAdd,
        edit: roleSave,
      }}
      title="角色"
      initialValues={data || {}}
      rowKey="roleId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        initialValue={data?.name}
        key="name"
        label="角色名称"
        name="name"
        rules={[
          {required: true, message: '请输入账号名称'},
        ]}
      >
        <Input placeholder="请输入账号名称"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.menuIds}
        key="menuIds"
        label="选择菜单权限"
        name="menuIds"
        rules={[
          {required: true, message: '请选择菜单权限'},
        ]}
      >
        {/* treeData={formatData(userInfo.menus)} */}
        <Tree api={menuTreeNow} border/>
      </Form.Item>
      <Form.Item
        initialValue={data?.group}
        key="group"
        label="选择分组权限"
        name="group"
        rules={[
          {required: false, message: '请选择分组权限'},
        ]}
      >
        <SelectTopClass/>
      </Form.Item>
      <Form.Item
        initialValue={0}
        key="status"
        label="角色状态"
        name="status"
        rules={[
          {required: true, message: '请选择账号状态'},
        ]}
      >
        <Radio.Group>
          <Radio value={1}>启用</Radio>
          <Radio value={0}>停用</Radio>
        </Radio.Group>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
