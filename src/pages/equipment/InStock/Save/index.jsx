import React, {useState} from 'react';
import Form from 'antd/es/form';
import {Input} from 'antd';
import AntForm from '@/components/AntForm';
import {instockAdd, instockEdit} from '@/pages/equipment/InStock/url';
import {caregoryFindAll} from '@/pages/equipment/Category/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';


const Save = ({data, success, close, visible}) => {

  const [categoryId, setCategoryId] = useState();

  return (
    <AntForm
      afterClose={() => {
        setCategoryId(null);
      }}
      apis={{
        add: instockAdd,
        edit: instockEdit,
      }}
      title="入库"
      initialValues={data}
      rowKey="instockId"
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
        key="MAC"
        label="设备MAC"
        name="MAC"
        rules={[
          {required: true, message: '请输入设备MAC'},
        ]}
      >
        <Input placeholder="请输入设备MAC"/>
      </Form.Item>
      <Form.Item
        key="cardNumber"
        label="物联网卡号"
        name="cardNumber"
        rules={[
          {required: true, message: '请输入设备使用的物联网卡号'},
        ]}
      >
        <Input placeholder="请输入设备使用的物联网卡号"/>
      </Form.Item>
      <Form.Item
        key="categoryId"
        label="设备类别"
        name="categoryId"
        rules={[
          {required: true, message: '请选择设备类别'},
        ]}
      >
        <Select
          api={caregoryFindAll}
          format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
          placeholder="请选择设备所属类别"
        />
      </Form.Item>
      <Form.Item
        key="modelId"
        label="设备型号"
        name="modelId"
        rules={[
          {required: true, message: '请选择设备型号'},
        ]}
      >
        <Select resh={categoryId} data={{categoryId}} api={deviceModelListSelect} placeholder="请选择设备所属型号"/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
