import React from 'react';
import {Input, Radio, Form} from 'antd';
import SelectTopClass from '@/pages/equipment/Category/Save/components/SelectTopClass';
import AntForm from '@/components/AntForm';
import {categoryAdd, categoryEdit} from '@/pages/equipment/Category/url';

const Save = props => {

  const {close, visible, data = {}, status, success} = props;

  return (
    <AntForm
      title="设备类别"
      apis={{
        add: categoryAdd,
        edit: categoryEdit,
      }}
      initialValues={{...data, status: data.status || '1'}}
      rowKey="categoryId"
      success={success}
      visible={visible}
      close={close}
      format={(values) => ({...values, categoryId: data.categoryId})}
    >
      <Form.Item
        initialValue={data?.name}
        key="name"
        label="设备类别名称"
        name="name"
        rules={[
          {required: true, message: '请输入设备类别名称'},
        ]}
      >
        <Input placeholder="请输入设备类别名称"/>
      </Form.Item>
      {status && <Form.Item
        initialValue={data?.pid}
        key="pid"
        name="pid"
        label="选择上级类别"
        rules={[
          {required: true, message: '请选择上级类别'},
        ]}
      >
        <SelectTopClass/>
      </Form.Item>}
      {!status && <Form.Item
        initialValue={data?.status || '1'}
        key="status"
        label="类别状态"
        name="status"
        rules={[
          {required: true, message: '请选择类别状态'},
        ]}
      >
        <Radio.Group>
          <Radio value="1">启用</Radio>
          <Radio value="0">停用</Radio>
        </Radio.Group>
      </Form.Item>}
    </AntForm>
  );
};

export default Save;
