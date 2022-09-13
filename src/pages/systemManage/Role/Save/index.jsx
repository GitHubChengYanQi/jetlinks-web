import React from 'react';
import {Form, Input, message, Modal, Radio,  Spin} from 'antd';
import Tree from '@/components/Tree';
import {useRequest} from '@/util/Request';
import {roleAdd, roleSave} from '@/Config/ApiUrl/system/role';
import {menuTreeNow} from '@/Config/ApiUrl/system/menu';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';


const Save = ({
  visible,
  close = () => {
  },
  data = {},
  success = () => {
  }
}) => {

  const [form] = Form.useForm();

  const {loading: addLoading, run: add} = useRequest(roleAdd, {
    manual: true,
    onSuccess: () => {
      message.success('修改成功！');
      success();
    }
  });
  const {loading: editLoading, run: edit} = useRequest(roleSave, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功！');
      success();
    }
  });


  const submitData = () => {
    form.validateFields().then((values) => {
      values = {...values, menuIds: values.menuIds.toString(), roleId: data.roleId};
      if (data.roleId) {
        edit({data: values});
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
      okButtonProps={{loading: addLoading || editLoading}}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => close()}
    >
      <Spin spinning={addLoading || editLoading}>
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
            initialValue={data?.menuIds}
            key="menuIds"
            label="选择菜单权限"
            name="menuIds"
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
            <SelectTopClass />
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
      </Spin>
    </Modal>
  );
};

export default Save;
