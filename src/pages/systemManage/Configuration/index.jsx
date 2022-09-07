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
        <Form.Item label="平合模式" name='map'>
          <Radio.Group>
            <Space direction='vertical'>
              <Radio value='close'>
                <Space>外网模式 <div className={styles.extra}>(互联网部署，联网使用，包括在线地图、短信通知)</div></Space>
              </Radio>
              <Radio value='open'>
                <Space>内网模式 <div className={styles.extra}>(本地部署，内网使用，包括离线地图、内网短信推送)</div></Space>
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
