import React from 'react';
import Form from 'antd/es/form';
import {Input, Radio} from 'antd';
import FileUpload from '@/components/FileUpload';
import AntForm from '@/components/AntForm';
import {deviceModelAdd, deviceModelEdit} from '@/pages/equipment/Model/url';
import SelectTopClass from '@/pages/equipment/Category/Save/components/SelectTopClass';

const Save = props => {

  const {success, data, visible, close} = props;

  return (
    <AntForm
      apis={{
        add: deviceModelAdd,
        edit: deviceModelEdit,
      }}
      title="设备型号"
      initialValues={{...data, status: data.status || '1'}}
      rowKey="categoryId"
      success={success}
      visible={visible}
      close={close}
      format={(values) => ({...values})}
    >
      <Form.Item
        initialValue={data?.name}
        key="name"
        label="设备型号名称"
        name="name"
        rules={[
          {required: true, message: '请输入设备型号名称'},
        ]}
      >
        <Input placeholder="请输入设备型号名称" />
      </Form.Item>
      <Form.Item
        initialValue={data?.categoryId}
        key="categoryId"
        label="选择设备类别"
        name="categoryId"
        rules={[
          {required: true, message: '请选择设备类别'},
        ]}
      >
        <SelectTopClass />
      </Form.Item>
      <Form.Item
        initialValue={data?.status || '1'}
        key="status"
        label="设备型号状态"
        name="status"
        rules={[
          {required: true, message: '请选择设备型号状态'},
        ]}
      >
        <Radio.Group>
          <Radio value="1">启用</Radio>
          <Radio value="0">停用</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        initialValue={data?.file}
        key="file"
        label="上传通信协议"
        name="file"
        rules={[
          {required: true, message: '请上传通信协议'},
        ]}
      >
        <FileUpload defaultFileList={data?.file ? [{name: data?.fileName}] : []} />
      </Form.Item>
    </AntForm>
  );
};

export default Save;
