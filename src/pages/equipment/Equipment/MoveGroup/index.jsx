import React from 'react';
import {Form} from 'antd';
import AntForm from '@/components/AntForm';
import {deviceAdd, deviceEdit} from '@/pages/equipment/Equipment/url';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';


const MoveGroup = (
  {
    success,
    data = {},
    visible,
    close
  }
) => {

  return (
    <AntForm
      apis={{
        add: deviceAdd,
        edit: deviceEdit,
      }}
      headerTitle="移动分组"
      rowKey="deviceId"
      success={success}
      initialValues={data}
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
        initialValue={data?.classifyId}
        wrapperCol={24}
        key="classifyId"
        name="classifyId"
        rules={[
          {required: true, message: '请选择设备分组'},
        ]}
      >
        <SelectTopClass />
      </Form.Item>
    </AntForm>
  );
};

export default MoveGroup;
