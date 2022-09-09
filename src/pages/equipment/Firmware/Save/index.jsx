import React, {useState} from 'react';
import {Input, Radio,Form} from 'antd';
import FileUpload from '@/components/FileUpload';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import AntForm from '@/components/AntForm';
import Select from '@/components/Select';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {deviceAdd, deviceEdit} from '@/pages/equipment/Equipment/url';
import {firmwareAdd, firmwareEdit} from '@/pages/equipment/Firmware/url';

const Save = ({
  success = () => {
  },
  data,
  visible,
  close = () => {
  }
}) => {

  const [categoryId, setCategoryId] = useState();

  return (
    <AntForm
      afterClose={() => {
        setCategoryId(null);
      }}
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
      onValuesChange={(values) => {
        if (values.categoryId) {
          setCategoryId(values.categoryId);
        }
      }}
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
        <Input placeholder="请输入设备固件名称" />
      </Form.Item>
      <Form.Item
        initialValue={data?.categoryId}
        key="categoryId"
        label="设备所属类别"
        name="categoryId"
        rules={[
          {required: true, message: '请选择设备所属类别'},
        ]}
      >
        <Select
          api={categoryFindAll}
          format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
          placeholder="请选择设备所属类别"
        />
      </Form.Item>
      <Form.Item
        initialValue={data?.modelId}
        key="modelId"
        label="设备所属型号"
        name="modelId"
        rules={[
          {required: true, message: '请选择设备所属型号'},
        ]}
      >
        <Select resh={categoryId} data={{categoryId}} api={deviceModelListSelect} placeholder="请选择设备所属型号" />
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
        <Input placeholder="请输入固件版本" />
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
        <FileUpload defaultFileList={data?.fileId ? [{name: data?.fileName}] : []} />
      </Form.Item>
    </AntForm>
  );
};

export default Save;
