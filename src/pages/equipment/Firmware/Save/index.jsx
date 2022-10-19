import React from 'react';
import {Input, Radio, Form} from 'antd';
import FileUpload from '@/components/FileUpload';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import AntForm from '@/components/AntForm';
import Select from '@/components/Select';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {firmwareAdd, firmwareEdit} from '@/pages/equipment/Firmware/url';

const Save = ({
  categoryId,
  modelId,
  success = () => {
  },
  data,
  visible,
  close = () => {
  }
}) => {

  return (
    <AntForm
      apis={{
        add: firmwareAdd,
        edit: firmwareEdit,
      }}
      title="设备固件"
      initialValues={data}
      rowKey="firmwarId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        initialValue={data?.name}
        key="name"
        label="设备固件名称"
        name="name"
        rules={[
          {required: true, message: '请输入设备固件名称'},
        ]}
      >
        <Input placeholder="请输入设备固件名称"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.categoryId || categoryId}
        key="categoryId"
        label="设备所属类别"
        name="categoryId"
        rules={[
          {required: true, message: '请选择设备所属类别'},
        ]}
      >
        <Select
          disabled={categoryId}
          api={categoryFindAll}
          format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
          placeholder="请选择设备所属类别"
        />
      </Form.Item>
      <Form.Item
        initialValue={data?.modelId || modelId}
        key="modelId"
        label="设备所属型号"
        name="modelId"
        rules={[
          {required: true, message: '请选择设备所属型号'},
        ]}
      >
        <Select disabled={modelId} api={deviceModelListSelect} placeholder="请选择设备所属型号"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.version}
        key="version"
        label="固件版本"
        name="version"
        rules={[
          {required: true, message: '请输入固件版本'},
        ]}
      >
        <Input placeholder="请输入固件版本"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.status || '1'}
        key="status"
        label="固件状态"
        name="status"
        rules={[
          {required: true, message: '请选择固件状态'},
        ]}
      >
        <Radio.Group>
          <Radio value="1">启用</Radio>
          <Radio value="0">停用</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        initialValue={data?.fileId}
        key="fileId"
        label="上传设备固件"
        name="fileId"
        rules={[
          {required: true, message: '请上传设备固件'},
        ]}
      >
        <FileUpload defaultFileList={data?.fileId ? [{name: data?.fileName}] : []}/>
      </Form.Item>
      <Form.Item
        initialValue={data?.remarks}
        key="remarks"
        label="描述"
        name="remarks"
        rules={[
          {required: true, message: '请输入描述内容'},
        ]}
      >
        <Input.TextArea placeholder="请输入描述内容" maxLength={300} showCount/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
