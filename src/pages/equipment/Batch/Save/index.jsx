import React, {useState} from 'react';
import {Input, Form} from 'antd';
import AntForm from '@/components/AntForm';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import InputNumber from '@/components/InputNumber';
import {deviceBatchAdd} from '@/pages/equipment/Batch/url';


const Save = ({data, success, close, visible}) => {

  const [categoryId, setCategoryId] = useState();

  return (
    <AntForm
      afterClose={() => {
        setCategoryId(null);
      }}
      apis={{
        add: deviceBatchAdd,
      }}
      title="批次"
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
        key="time"
        label="选择时间"
        name="time"
        rules={[
          {required: true, message: '请选择时间'},
        ]}
      >
        <DatePicker picker="month" placeholder="请选择时间" />
      </Form.Item>
      <Form.Item
        key="batchNo"
        label="批次号"
        name="batchNo"
        rules={[
          {required: true, message: '请输入批次号'},
        ]}
      >
        <Input placeholder="请输入批次号" />
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
          api={categoryFindAll}
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
        <Select resh={categoryId} data={{categoryId}} api={deviceModelListSelect} placeholder="请选择设备所属型号" />
      </Form.Item>
      <Form.Item
        key="deviceNo"
        label="设备号"
        name="deviceNo"
        rules={[
          {required: true, message: '请输入设备号'},
        ]}
      >
        <Input placeholder="请输入设备号" />
      </Form.Item>
      <Form.Item
        key="qualityInspector"
        label="质检员"
        name="qualityInspector"
        rules={[
          {required: true, message: '请输入质检员'},
        ]}
      >
        <Input placeholder="请输入质检员" />
      </Form.Item>
    </AntForm>
  );
};

export default Save;
