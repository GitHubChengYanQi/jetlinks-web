import React from 'react';
import {Input, Radio,Form} from 'antd';
import FileUpload from '@/components/FileUpload';
import AntForm from '@/components/AntForm';
import {deviceModelAdd, deviceModelEdit} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';
import {categoryFindAll} from '@/pages/equipment/Category/url';

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
      rowKey="modelId"
      success={success}
      visible={visible}
      close={close}
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
        <Input placeholder="请输入设备型号名称"/>
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
        <Select
          api={categoryFindAll}
          format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
          placeholder="请选择设备所属类别"
        />
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
        hidden
        initialValue={data?.file}
        key="file"
        label="上传通信协议"
        name="file"
      >
        <FileUpload defaultFileList={data?.file ? [{name: data?.fileName}] : []}/>
      </Form.Item>
      <Form.Item
        initialValue={data?.protocolPath}
        key="protocolPath"
        label="通信协议名称"
        name="protocolPath"
        rules={[{required:true,message:'请输入通信协议名称'}]}
      >
        <Input placeholder='请输入通信协议名称' />
      </Form.Item>
    </AntForm>
  );
};

export default Save;
