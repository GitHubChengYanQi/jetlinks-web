import React from 'react';
import {Input,  Form, Select, Space, Checkbox} from 'antd';
import AntForm from '@/components/AntForm';
import InputNumber from '@/components/InputNumber';
import styles from '@/pages/monitor/Info/Save/index.module.less';

const Save = ({
  success = () => {
  },
  data,
  visible,
  close = () => {
  }
}) => {


  return (
    <AntForm
      headerTitle="报警设置"
      initialValues={data}
      rowKey="firmwarId"
      success={success}
      visible={visible}
      close={close}
    >
      <Form.Item
        initialValue={data?.name}
        key="name"
        label="阈值名称"
        name="name"
        rules={[
          {required: true, message: '请选择阈值名称'},
        ]}
      >
        <Select placeholder="请选择阈值名称"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.categoryId}
        key="categoryId"
        label="电网供电电压"
        name="categoryId"
        rules={[
          {required: true, message: '请选择电网供电电压'},
        ]}
      >
        <Select placeholder="请选择电网供电电压"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.modelId}
        key="modelId"
        label="阈值下限"
        name="modelId"
        rules={[
          {required: true, message: '请输入阈值下限'},
        ]}
      >
        <InputNumber placeholder="请输入阈值下限"/>
      </Form.Item>
      <Form.Item
        initialValue={data?.version}
        key="version"
        label="选择报警信息"
        name="version"
        rules={[
          {required: true, message: '请选择报警信息'},
        ]}
      >
        <Checkbox.Group className={styles.checkGroop}>
          <Space direction="vertical">
            <Space>
              <Checkbox>终端备注</Checkbox>
              <Checkbox>登记名称</Checkbox>
              <Checkbox>设备类别</Checkbox>
            </Space>
            <Space>
              <Checkbox>设备型号</Checkbox>
              <Checkbox>IP地址</Checkbox>
              <Checkbox>MAC地址</Checkbox>
            </Space>
            <Space>
              <Checkbox>所属客户</Checkbox>
              <Checkbox>报警时间</Checkbox>
              <Checkbox>报警类型</Checkbox>
            </Space>
          </Space>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        initialValue={data?.status || '1'}
        key="status"
        label="编辑报警信息"
        name="status"
        rules={[
          {required: true, message: '请选择固件状态'},
        ]}
      >
        <Input.TextArea/>
      </Form.Item>
      <Form.Item
        initialValue={data?.fileId}
        key="fileId"
        label="报警联系人"
        name="fileId"
        rules={[
          {required: true, message: '请选择报警联系人'},
        ]}
      >
        <Checkbox.Group>
          <Space direction="vertical">
            <Checkbox value="0">李子木，17777777777</Checkbox>
            <Checkbox value="1">李子木，17777777777</Checkbox>
            <Checkbox value="2">李子木，17777777777</Checkbox>
            <Checkbox value="0">李子木，17777777777</Checkbox>
            <Checkbox value="1">李子木，17777777777</Checkbox>
            <Checkbox value="2">李子木，17777777777</Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </AntForm>
  );
};

export default Save;
