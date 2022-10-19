import React, {useState} from 'react';
import {Input, Form} from 'antd';
import AntForm from '@/components/AntForm';
import {instockAdd, instockEdit} from '@/pages/equipment/InStock/url';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import InputNumber from '@/components/InputNumber';


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
      format={(values) => {
        const position = values.position || [];
        return {
          ...values,
          longitude: position[0],
          latitude: position[1],
        };
      }}
      onValuesChange={(values) => {
        if (values.categoryId) {
          setCategoryId(values.categoryId);
        }
      }}
    >
      <Form.Item
        initialValue={data?.mac}
        key="MAC"
        label="设备MAC"
        name="MAC"
        rules={[
          {required: true, message: '请输入设备MAC'},
        ]}
      >
        <Input placeholder="请输入设备MAC" />
      </Form.Item>
      <Form.Item
        initialValue={data?.cardNumber}
        key="cardNumber"
        label="物联网卡号"
        name="cardNumber"
        rules={[
          {required: true, message: '请输入设备使用的物联网卡号'},
        ]}
      >
        <Input placeholder="请输入设备使用的物联网卡号" />
      </Form.Item>
      <Form.Item
        initialValue={data?.categoryId}
        key="categoryId"
        label="设备类别"
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
        initialValue={data?.modelId}
        key="modelId"
        label="设备型号"
        name="modelId"
        rules={[
          {required: true, message: '请选择设备型号'},
        ]}
      >
        <Select resh={categoryId} data={{categoryId}} api={deviceModelListSelect} placeholder="请选择设备所属型号" />
      </Form.Item>
      <Form.Item
        initialValue={data?.batch}
        key="batch"
        label="批次"
        name="batch"
        rules={[
          {required: true, message: '请输入批次'},
        ]}
      >
        <InputNumber placeholder="请输入批次" />
      </Form.Item>
      <Form.Item
        initialValue={data?.instockTime || new Date()}
        key="instockTime"
        label="入库时间"
        name="instockTime"
        rules={[
          {required: true, message: '请选择入库时间'},
        ]}
      >
        <DatePicker />
      </Form.Item>
    </AntForm>
  );
};

export default Save;
