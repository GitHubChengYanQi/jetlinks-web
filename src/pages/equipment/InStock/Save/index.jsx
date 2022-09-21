import React, {useState} from 'react';
import {Input,Form} from 'antd';
import AntForm from '@/components/AntForm';
import {instockAdd, instockEdit} from '@/pages/equipment/InStock/url';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';
import DatePicker from '@/components/DatePicker';
import Position from '@/pages/equipment/Equipment/Save/components/Position';


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
        <Select resh={categoryId} data={{categoryId}} api={deviceModelListSelect} placeholder="请选择设备所属型号"/>
      </Form.Item>
      <Form.Item
        key="name"
        label="登记名称"
        name="name"
        rules={[
          {required: true, message: '请输入登记名称'},
        ]}
      >
        <Input placeholder="请输入登记名称"/>
      </Form.Item>
      <Form.Item
        key="remarks"
        label="终端备注"
        name="remarks"
        rules={[
          {required: true, message: '请输入终端备注'},
        ]}
      >
        <Input placeholder="请输入终端备注"/>
      </Form.Item>
      <Form.Item
        key="classifyId"
        label="设备分组"
        name="classifyId"
        rules={[
          {required: true, message: '请选择设备分组'},
        ]}
      >
        <SelectTopClass/>
      </Form.Item>
      <Form.Item
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
        key="instockTime"
        label="入库时间"
        name="instockTime"
        rules={[
          {required: true, message: '请选择入库时间'},
        ]}
      >
        <DatePicker/>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
