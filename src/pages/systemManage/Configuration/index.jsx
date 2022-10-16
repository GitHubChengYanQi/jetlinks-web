import React, {useState} from 'react';
import {Button, Image, Input, Form, InputNumber, Radio, Space, Spin, Tabs, message} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import styles from './index.module.less';
import FileUpload from '@/components/FileUpload';
import {useRequest} from '@/util/Request';
import {customerEdit} from '@/pages/systemManage/Tenant/url';
import store from '@/store';
import {preview} from '@/components/DownloadFile';


const Configuration = () => {

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  const [dataSource, dataDispatchers] = store.useModel('dataSource');

  const defaultParams = {module: 'close', time: 'close'};

  const [params, setParams] = useState(defaultParams);

  const customer = dataSource.customer || {};

  const [form] = Form.useForm();

  const [userInfo] = store.useModel('user');

  const info = userInfo.info || {};

  const [fileId, setFileId] = useState(customer.logo);

  const {loading: editLoading, run: edit} = useRequest(customerEdit, {
    manual: true,
    onSuccess: () => {
      message.success('修改成功！');
      dataDispatchers.getCustomer(info.customerId);
    },
    onError: () => message.error('修改失败！')
  });


  return <Spin spinning={editLoading}>
    <Form form={form} labelCol={{span: 2}}>
      <div className={styles.card}>
        <Tabs defaultActiveKey="1" items={[{
          key: '1',
          label: '企业配置',
          children: <>
            <Form.Item label="企业名称">
              <Space>
                <Form.Item
                  initialValue={customer.resetName}
                  name="resetName"
                  noStyle
                >
                  <Input style={{minWidth: 400}} placeholder="请输入企业真实名称"/>
                </Form.Item>
                <div className={styles.extra}>（企业名称将显示在您的平台左上角位置）</div>
              </Space>
            </Form.Item>

            <Form.Item label="企业LOGO">
              <Space>
                <Form.Item
                  name="logo"
                  noStyle
                  initialValue={fileId}
                >
                  <FileUpload onChange={(file) => setFileId(file)}/>
                </Form.Item>
                <div className={styles.extra}>（企业LOGO将显示在您的平台左上角企业LOGO和右上角账号头像）</div>
              </Space>
            </Form.Item>

            <Form.Item label="预览">
              <Image width={100} src={`${baseURI}${preview}?fileId=${fileId}&authorization=${token}`}/>
            </Form.Item>

          </>
        }]}/>
      </div>

      <div className={styles.card}>
        <Form.Item label="登录有效期" name="loginTime" initialValue="close">
          <Space direction="vertical">
            <Radio
              value="close"
              checked={params.time === 'close'}
              onClick={() => setParams({...params, time: 'close'})}>关</Radio>
            <Space align="center">
              <Radio
                checked={params.time === 'open'}
                value="open"
                onClick={() => setParams({...params, time: 'open', minute: 1})}/>
              长时间未操作、后台挂起、正常使用
              <InputNumber
                onChange={(value) => setParams({...params, time: 'open', minute: value})} value={params.minute} min={1}
                style={{margin: '0 8px'}}/>
              分钟后，重新登录系统
            </Space>
          </Space>
        </Form.Item>
      </div>

      <div className={styles.card}>
        <Form.Item label="平合模式" name="map" initialValue="close">
          <div>
            <Radio.Group value={params.module} onChange={({target: {value}}) => setParams({...params, module: value})}>
              <Space direction="vertical">
                <Radio value="close" checked={params.module === 'close'}>
                  <Space>外网模式 <div className={styles.extra}>(互联网部署，联网使用，包括在线地图、短信通知)</div></Space>
                </Radio>
                <Radio value="open" checked={params.module === 'open'}>
                  <Space>内网模式 <div className={styles.extra}>(本地部署，内网使用，包括离线地图、内网短信推送)</div></Space>
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </Form.Item>
      </div>
    </Form>

    <div className={styles.actions}>
      <Space>
        <Button type="primary" ghost onClick={() => setParams(defaultParams)}>重置</Button>
        <Button type="primary" onClick={() => {
          const values = form.getFieldValue();
          edit({data: {...values, customerId: info.customerId}});
        }}>确认</Button>
      </Space>
    </div>
  </Spin>;
};

export default Configuration;
