import React, {useState} from 'react';
import {Checkbox, Input, Modal, Select, Space, Spin,Form} from 'antd';


const Save = props => {

  const [loading,] = useState(false);

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  return (
    <Modal
      width={800}
      title="报警设置"
      open={props.visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => props.close()}
    >
      <Spin spinning={loading}>
        <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 20}}>
          <Form.Item
            initialValue={props.data.note}
            key="type"
            label="报警类型"
            name="type"
            rules={[
              {required: true, message: '请选择报警类型'},
            ]}
          >
            <Select options={[{label: '市电电压', value: '1'}]} placeholder="请选择报警类型"/>
          </Form.Item>
          <Form.Item
            initialValue={props.data.note}
            key="info"
            label="选择报警信息"
            name="info"
            rules={[
              {required: true, message: '请选择报警信息'},
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="0">终端设备</Checkbox>
              <Checkbox value="1">登记名称</Checkbox>
              <Checkbox value="2">所属客户</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            initialValue={props.data.note}
            key="note"
            label="编辑报警信息"
            name="note"
            rules={[
              {required: true, message: '请编辑报警信息'},
            ]}
          >
            <Input.TextArea rows={4} placeholder="自定义编辑报警信息"/>
          </Form.Item>
          <Form.Item
            initialValue={props.data.note}
            key="user"
            label="报警联系人"
            name="user"
            rules={[
              {required: true, message: '请选择报警联系人'},
            ]}
          >
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value="0">李子木，17777777777</Checkbox>
                <Checkbox value="1">李子木，17777777777</Checkbox>
                <Checkbox value="2">李子木，17777777777</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Save;
