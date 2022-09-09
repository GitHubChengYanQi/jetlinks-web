import React from 'react';
import {Input,Form} from 'antd';
import Position from '@/pages/equipment/Equipment/Save/components/Position';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import AntForm from '@/components/AntForm';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import Select from '@/components/Select';
import Cascader from '@/components/Cascader';
import {addressTree} from '@/Config/ApiUrl';
import {deviceAdd, deviceEdit} from '@/pages/equipment/Equipment/url';


const Save = props => {

  const {success, data = {}, visible, close} = props;

  return (
    <AntForm
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
        rules={[
          {required: true, message: '请输入设备MAC'},
        ]}
      >
        <Input disabled placeholder="请输入设备MAC" />
      </Form.Item>
      <Form.Item
        initialValue={data.customerName}
        key="customerName"
        label="所属客户"
        name="customerName"
        rules={[
          {required: false, message: '请选择所属客户'},
        ]}
      >
        <Input disabled placeholder="请选择所属客户" />
      </Form.Item>
      <Form.Item
        initialValue={data.remarks}
        key="remarks"
        label="终端备注"
        name="remarks"
        rules={[
          {required: true, message: '请输入终端备注'},
        ]}
      >
        <Input placeholder="请输入终端备注" />
      </Form.Item>
      <Form.Item
        initialValue={data.name}
        key="name"
        label="登记名称"
        name="name"
        rules={[
          {required: true, message: '请输入登记名称'},
        ]}
      >
        <Input disabled placeholder="请输入登记名称" />
      </Form.Item>
      <Form.Item
        initialValue={data.categoryId}
        key="categoryId"
        label="设备类别"
        name="categoryId"
        rules={[
          {required: true, message: '请选择设备类别'},
        ]}
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
        rules={[
          {required: true, message: '请选择设备型号'},
        ]}
      >
        <Select disabled api={deviceModelListSelect} placeholder="请选择设备所属型号" />
      </Form.Item>
      <Form.Item
        initialValue={data.position}
        key="position"
        label="经纬度信息"
        name="position"
        rules={[
          {required: false, message: '请输入经纬度信息'},
        ]}
      >
        <Position />
      </Form.Item>
      <Form.Item
        initialValue={data.positionId}
        key="positionId"
        label="位置信息"
        name="positionId"
        rules={[
          {required: false, message: '请选择位置信息'},
        ]}
      >
        <Cascader api={addressTree} />
      </Form.Item>
      <Form.Item
        initialValue={data.address}
        key="address"
        label="详细地址"
        name="address"
        rules={[
          {required: true, message: '请输入详细地址'},
        ]}
      >
        <Input.TextArea placeholder="请输入详细地址" />
      </Form.Item>
    </AntForm>
  );
};

export default Save;
