import React, {useEffect, useState} from 'react';
import {Input, Form, Radio} from 'antd';
import Position from '@/pages/equipment/Equipment/Save/components/Position';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import AntForm from '@/components/AntForm';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import Select from '@/components/Select';
import Cascader from '@/components/Cascader';
import {deviceAdd, deviceEdit} from '@/pages/equipment/Equipment/url';
import store from '@/store';


const Save = props => {

  const {success, data = {}, visible, close} = props;

  const [dataSource] = store.useModel('dataSource');

  const customer = dataSource.customer || {};

  const [form] = Form.useForm();

  const [positionId, sePositionId] = useState();

  useEffect(() => {
    if (visible) {
      sePositionId(data.positionId);
    }
  }, [visible]);

  return (
    <AntForm
      form={form}
      apis={{
        add: deviceAdd,
        edit: deviceEdit,
      }}
      title="设备"
      initialValues={data}
      rowKey="deviceId"
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
    >
      <Form.Item
        initialValue={data.mac}
        key="mac"
        label="设备MAC"
        name="mac"
      >
        <Input disabled placeholder="请输入设备MAC"/>
      </Form.Item>
      <Form.Item
        initialValue={data.customerName}
        key="customerName"
        label={customer.customerId ? '选择分组' : '所属客户'}
        name="customerName"
      >
        <Input disabled placeholder="请选择所属客户"/>
      </Form.Item>
      <Form.Item
        initialValue={data.remarks}
        key="remarks"
        label="终端备注"
        name="remarks"
      >
        <Input disabled={customer.customerId} placeholder="请输入终端备注"/>
      </Form.Item>
      <Form.Item
        initialValue={data.name}
        key="name"
        label="登记名称"
        name="name"
      >
        <Input disabled placeholder="请输入登记名称"/>
      </Form.Item>
      <Form.Item
        initialValue={data.categoryId}
        key="categoryId"
        label="设备类别"
        name="categoryId"
      >
        <Select
          disabled
          api={categoryFindAll}
          format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
          placeholder="请选择设备所属类别"
        />
      </Form.Item>
      <Form.Item
        initialValue={data.modelId}
        key="modelId"
        label="设备型号"
        name="modelId"
      >
        <Select disabled api={deviceModelListSelect} placeholder="请选择设备所属型号"/>
      </Form.Item>
      <Form.Item
        initialValue={data.alarmCustom ? '自定义' : '全局'}
        key="alarmCustom"
        label="报警类目"
        name="alarmCustom"
      >
        <Input disabled/>
      </Form.Item>
      <Form.Item
        initialValue={data.alarmCustom}
        key="alarmStatus"
        label="报警状态"
        name="alarmStatus"
      >
        <Radio.Group>
          <Radio>启用</Radio>
          <Radio>停用</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        initialValue={data.position}
        key="position"
        label="经度"
        name="position"
      >
        <Position/>
      </Form.Item>
      <Form.Item
        initialValue={data.positionId}
        key="positionId"
        label="位置信息"
        name="positionId"
      >
        <Cascader options={dataSource.area} placeholder="请选择位置信息" onChange={sePositionId}/>
      </Form.Item>
      <Form.Item
        initialValue={data.address}
        key="address"
        label="详细地址"
        name="address"
      >
        <Input.TextArea disabled={!positionId} placeholder="请输入详细地址"/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
