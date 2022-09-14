import React from 'react';
import {Form, Input, Radio} from 'antd';
import Tree from '@/components/Tree';
import {roleAdd, roleSave} from '@/Config/ApiUrl/system/role';
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

  const formatData = (data) => {
    return isArray(data).map((item, index) => {
      return {
        key: item.url ? `${item.id}` : `dict_${item.id}`,
        title: item.name,
        children: formatData(item.children || item.subMenus),
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
      format={(values) => {
        return {...values, menuIds: values.menuIds.filter(item => item.indexOf('dict') === -1).toString()};
      }}
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
        <Tree treeData={[{key: '0', title: '全部', children: formatData(userInfo.menus)}]} border/>
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
        initialValue={data?.status || 1}
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