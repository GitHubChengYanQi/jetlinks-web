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
    return isArray(data).map((item) => {
      const children = item.children || item.subMenus || [];
      return {
        key: item.url ? `${item.id}` : `dict_${item.id}`,
        title: item.name,
        checkStrictly: true,
        children: formatData(children),
      };
    });
  };


  let initMenuIds = data?.menuIds || [];

  const initMenuIdsFormat = (data) => {
    isArray(data).forEach((item) => {
      const children = item.children || item.subMenus || [];
      if (children.filter(item => initMenuIds.some(menuId => menuId === item.id)).length !== children.length) {
        initMenuIds = initMenuIds.filter((initMenuId) => initMenuId !== item.id);
      }
      initMenuIdsFormat(children, initMenuIds);
    });
    return initMenuIds;
  };

  initMenuIdsFormat(userInfo.menus);

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
        const some = values.menuIds.length === initMenuIds.length && values.menuIds.filter(item => initMenuIds.some(id => id === item)).length === values.menuIds.length;
        return {
          ...values,
          menuIds: some ? data?.menuIds.toString() : values.menuIds.filter(item => item.indexOf('dict') === -1).toString()
        };
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
        <Input placeholder="请输入账号名称" />
      </Form.Item>
      <Form.Item
        initialValue={initMenuIds}
        key="menuIds"
        label="选择菜单权限"
        name="menuIds"
        rules={[
          {required: true, message: '请选择菜单权限'},
        ]}
      >
        <Tree halfChecked treeData={[{key: '0', title: '全部', children: formatData(userInfo.menus)}]} border />
      </Form.Item>
      <Form.Item
        initialValue={data?.classifyIds}
        key="classifyIds"
        label="选择分组权限"
        name="classifyIds"
        rules={[
          {required: false, message: '请选择分组权限'},
        ]}
      >
        <SelectTopClass checkable />
      </Form.Item>
      <Form.Item
        initialValue={data?.status || '1'}
        key="status"
        label="角色状态"
        name="status"
        rules={[
          {required: true, message: '请选择账号状态'},
        ]}
      >
        <Radio.Group>
          <Radio value="1">启用</Radio>
          <Radio value="0">停用</Radio>
        </Radio.Group>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
