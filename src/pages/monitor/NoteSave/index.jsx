import React, {useState} from 'react';
import {Input, Modal, Spin,Form} from 'antd';


const NoteSave = props => {

  const [loading,] = useState(false);

  const [form] = Form.useForm();

  const submitData = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  return (
    <Modal
      destroyOnClose
      title='修改终端备注'
      open={props.data.id}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        submitData();
      }}
      onCancel={() => props.close()}
    >
      <Spin spinning={loading}>
        <Form form={form} layout='vertical'>
          <Form.Item
            initialValue={props.data.note}
            key="note"
            label="终端备注"
            name='note'
            rules={[
              {required: true, message: '请输入终端备注'},
            ]}
          >
            <Input placeholder="请输入终端备注" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default NoteSave;
