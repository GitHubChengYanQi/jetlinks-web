import React, {useState} from 'react';
import {Button, Image, Input, InputNumber, Radio, Space, Spin, Tabs} from 'antd';
import Form from 'antd/es/form';
import styles from './index.module.less';
import FileUpload from '@/components/FileUpload';


const Configuration = () => {

  const [form] = Form.useForm();

  const [titleIcon, setTitleIcon] = useState();

  const data = {};

  const [update, setUpdate] = useState();

  const loading = false;

  const updateSetting = () => {
    setUpdate(true);

  };

  if (!update && loading) {
    return <div style={{padding: 24, textAlign: 'center'}}><Spin /></div>;
  }

  return <Spin spinning={loading}>
    <Form form={form} labelCol={{span: 2}}>
      <div className={styles.card}>
        <Tabs defaultActiveKey="1" items={[{
          key: '1',
          label: '企业配置',
          children: <>
            <Form.Item label="企业名称">
              <Space>
                <Form.Item
                  initialValue={data.title}
                  name="title"
                  noStyle
                >
                  <Input placeholder='请输入企业真实名称' />
                </Form.Item>
                <div className={styles.extra}>（企业名称将显示在您的平台左上角位置）</div>
              </Space>
            </Form.Item>

            <Form.Item label="企业LOGO">
              <Space>
                <Form.Item
                  name="titleIcon"
                  noStyle
                  initialValue={titleIcon}
                >
                  <FileUpload fileData={(file) => setTitleIcon(file.url)} />
                </Form.Item>
                <div className={styles.extra}>（企业LOGO将显示在您的平台左上角位置和登录页面）</div>
              </Space>
            </Form.Item>

            <Form.Item label="预览">
              <Image width={100} src={titleIcon} />
            </Form.Item>

          </>
        }]} />
      </div>

      <div className={styles.card}>
        <Form.Item label="登陆有效期" name='loginTime'>
          <Radio.Group>
            <Space direction='vertical'>
              <Radio value='close'>关</Radio>
              <Radio value='open'>长时间未操作、后台挂起、正常使用<InputNumber style={{margin: '0 8px'}} /> 分钟后，重新登录系统</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className={styles.card}>
        <Form.Item label="地图模式" name='map'>
          <Radio.Group>
            <Space direction='vertical'>
              <Radio value='close'>
                <Space>在线地图 <div className={styles.extra}>(联网使用，适用于云平台)</div></Space>
              </Radio>
              <Radio value='open'>
                <Space>离线地图 <div className={styles.extra}>(内网使用，适用于本地私有化部署)</div></Space>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>
    </Form>

    <div className={styles.actions}>
      <Space>
        <Button type='primary' ghost>取消</Button>
        <Button type='primary' onClick={() => updateSetting()}>确认</Button>
      </Space>
    </div>
  </Spin>;
};

export default Configuration;
