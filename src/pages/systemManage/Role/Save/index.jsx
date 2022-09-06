import React from 'react';
import Form from 'antd/es/form';
import {Input, Modal, Radio, Select} from 'antd';
import Tree from '@/components/Tree';
import {useRequest} from '@/util/Request';
import {roleAdd, roleSave, roleSet} from '@/Config/ApiUrl/system/role';
import {menuTreeNow} from '@/Config/ApiUrl/system/menu';


const Save = ({
  visible,
  close = () => {
  },
  data = {},
  success = () => {
  }
}) => {


  const [form] = Form.useForm();

  const {loading: savePermissionLoading, run: savePermission} = useRequest(roleSet, {manual: true});

  const {loading: addLoading, run: add} = useRequest(roleAdd, {manual: true});
  const {loading: editLoading, run: edit} = useRequest(roleSave, {manual: true});


  const submitData = () => {
    form.validateFields().then((values) => {
      if (data.roleId) {
        edit({data: {...values, roleId: data.roleId}});
      } else {
        add({data: values});
      }
    });
  };


  return (
    <Modal
      width={600}
      destroyOnClose
      afterClose={() => form.resetFields()}
      title={`${data?.roleId ? '编辑' : '新建'}角色`}
      open={visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => close()}
    >
      <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 18}}>
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
          initialValue={data?.checked}
          key="checked"
          label="选择菜单权限"
          name="checked"
          rules={[
            {required: true, message: '请选择菜单权限'},
          ]}
        >
          <Tree api={menuTreeNow} border />
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
          <Select placeholder="请选择分组" />
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
      </Form>
    </Modal>
  );
};

export default Save;
