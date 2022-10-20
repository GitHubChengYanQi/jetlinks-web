import React from 'react';
import {Form} from 'antd';
import AntForm from '@/components/AntForm';
import {moveGroup} from '@/pages/equipment/Equipment/url';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';


const MoveGroup = (
  {
    success,
    deviceIds = [],
    visible,
    close
  }
) => {

  return (
    <AntForm
      apis={{
        add: moveGroup,
        edit: moveGroup,
      }}
      headerTitle="移动分组"
      rowKey="deviceId"
      success={success}
      visible={visible}
      close={close}
      format={(values) => {
        return {...values, deviceIds};
      }}
    >
      <Form.Item
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
