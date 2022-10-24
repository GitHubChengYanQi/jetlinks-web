import React, {useState} from 'react';
import {Form, Card, Col, Drawer, Input, Row, Checkbox, Button, Space, Tooltip, message, Spin, Modal} from 'antd';
import {ExclamationCircleFilled, QuestionCircleOutlined, CloseOutlined} from '@ant-design/icons';
import styles from './index.module.less';
import FileUpload from '../../../components/FileUpload';
import Password from './components/Password';
import {useRequest} from '@/util/Request';
import {customerAdd, customerAddCustomer, customerEdit} from '@/pages/systemManage/Tenant/url';
import InputNumber from '@/components/InputNumber';


const AccountAsk = (
  {login, visible, onClose, data = {}, visibilityToggle = true, customer}
) => {

  const [form] = Form.useForm();

  const [errorText, setErrorText] = useState('');

  const [success, setSuccess] = useState(false);

  const [checked, setChecked] = useState(customer);

  const [reset, setReset] = useState(false);

  const clear = () => {
    setErrorText('');
    setSuccess(false);
    onClose();
    setReset(false);
  };

  const {loading, run} = useRequest(login ? customerAddCustomer : customerAdd, {
    manual: true,
    response: true,
    onSuccess: (res) => {
      if (res.errCode === 1001) {
        Modal.warn({
          content: res.message,
          okText: '确认'
        });
        return;
      }
      message.success('申请成功');
      setErrorText('');
      setSuccess(true);
    }
  });

  const {loading: editLoading, run: edit} = useRequest(customerEdit, {
    manual: true,
    response: true,
    onSuccess: (res) => {
      if (res.errCode === 1001) {
        Modal.warn({
          content: res.message,
          okText: '确认'
        });
        return;
      }
      message.success('修改成功');
      setErrorText('');
      setSuccess(true);
    }
  });

  const submit = () => {
    form.validateFields().then((values) => {
      if (!checked) {
        setErrorText('请阅读并同意《用户服务条款和用户隐私政策》');
        return;
      }
      if (customer) {
        edit({
          data: {
            ...values,
            customerId: data.customerId,
            adminPassword: reset ? values.adminPassword : null
          }
        });
        return;
      }
      run({data: values});
    }).catch((e) => {
      console.log(e);
      setErrorText('请填写完整申请所需内容');
    });
  };

  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleConfirmBlur = (event) => {
    const value = event.target.value;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('adminPassword')) {
      callback('您输入的两个密码不一致！');
    } else {
      callback();
    }
  };


  return <>
    <Drawer
      extra={<CloseOutlined style={{cursor: 'pointer'}} onClick={() => {
        clear();
      }} />}
      // closable={false}
      closeIcon={null}
      height="100vh"
      placement="top"
      open={visible}
      afterOpenChange={() => {
        form.resetFields();
      }}
      onClose={() => {
        setSuccess(false);
        onClose();
      }}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>设备业务云平台企业账号申请</div>
        <div className={styles.tips}>准备并提交相关申请资料，提交后由专职人员负责审核，3个工作日内进行审核，请耐心等待</div>
      </div>
      <div className={styles.content}>
        <Spin spinning={loading || editLoading}>
          <Form
            form={form}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onValuesChange={(changedValues) => {
              if (changedValues.adminPassword) {
                form.setFieldValue('check', '');
              }
            }}
          >
            <Row gutter={24}>
              <Col span={12} className={styles.col}>
                <Card title="1、基本信息" bordered={false} headStyle={{border: 'none'}}>
                  <Form.Item
                    initialValue={data.name}
                    key="name"
                    label="企业名称"
                    name="name"
                    rules={[
                      {required: true, message: '请输入企业名称'},
                    ]}
                  >
                    <Input disabled={success} placeholder="请输入企业名称" />
                  </Form.Item>
                  <Form.Item
                    initialValue={data.code}
                    key="code"
                    label="统一社会信用代码"
                    name="code"
                    rules={[
                      {required: true, message: '请输入统一社会信用代码'},
                      {
                        pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
                        message: '请输入正确统一社会信用代码'
                      },
                    ]}
                  >
                    <Input disabled={success} placeholder="请输入统一社会信用代码" />
                  </Form.Item>
                  <Form.Item
                    initialValue={data.place}
                    key="place"
                    label="企业经营场所"
                    name="place"
                    rules={[
                      {required: true, message: '请输入企业经营场所'},
                    ]}
                  >
                    <Input disabled={success} placeholder="请输入企业经营场所" />
                  </Form.Item>
                  <Form.Item
                    initialValue={data.contactName}
                    key="contactName"
                    label="管理员姓名"
                    name="contactName"
                    rules={[
                      {required: true, message: '请输入管理员姓名'},
                    ]}
                  >
                    <Input disabled={success} placeholder="请输入管理员姓名" />
                  </Form.Item>
                  <Form.Item
                    initialValue={data.contactPhone}
                    key="contactPhone"
                    label="管理员手机号码"
                    name="contactPhone"
                    rules={[
                      {required: true, message: '请输入管理员手机号码'},
                      {message: '请输入正确的手机号码!', pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/}
                    ]}
                  >
                    <InputNumber disabled={success} placeholder="请输入管理员手机号码" />
                  </Form.Item>
                  <Form.Item
                    initialValue={data.adminAccount}
                    key="adminAccount"
                    label="设置管理员账号"
                    name="adminAccount"
                    rules={[
                      {required: true, message: '请输入企业管理员账号名称'},
                    ]}
                  >
                    <Input autoComplete="new-password" disabled={success} placeholder="请输入企业管理员账号名称" />
                  </Form.Item>
                  <Form.Item key="adminPassword" label="管理员密码" required>
                    <Form.Item
                      noStyle
                      initialValue={customer ? 'opt123' : null}
                      name="adminPassword"
                      rules={[
                        {required: true, message: '请输入企业管理员账号密码'},
                        {
                          pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,18}$/,
                          message: '密码包含6~18位字母、数字、特殊符号的2种或多种组合',
                        },
                      ]}
                    >
                      <Password
                        visibilityToggle={visibilityToggle}
                        reset={customer}
                        inputDisabled={customer}
                        content="您确定要重置密码么？重置后默认初始密码为【opt123】"
                        initPassword={() => {
                          return 'opt123';
                        }}
                        show={!reset && customer}
                        onReset={() => {
                          setReset(true);
                        }}
                        disabled={success}
                        placeholder="请输入企业管理员账号密码"
                      />
                    </Form.Item>
                    <div className={styles.extra}>
                      <Tooltip placement="top" title="密码包含6~18位字母、数字、特殊符号的2种或多种组合">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </div>
                  </Form.Item>
                  {!customer && <Form.Item
                    key="check"
                    label="再次确认密码"
                    name="check"
                    rules={[
                      {required: true, message: '请再次输入企业管理员账号密码'},
                      {validator: compareToFirstPassword}
                    ]}
                  >
                    <Input.Password
                      visibilityToggle={visibilityToggle}
                      disabled={success}
                      placeholder="请再次输入企业管理员账号密码"
                      onBlur={(event) => {
                        event.persist();
                        handleConfirmBlur(event);
                      }}
                    />
                  </Form.Item>}
                </Card>
              </Col>
              <Col span={12}>
                <Card title="2、辅助验证" bordered={false} headStyle={{border: 'none'}}>
                  <Form.Item
                    initialValue={data.file}
                    key="file"
                    label="上传营业执照"
                    name="file"
                  >
                    <FileUpload defaultFileList={data?.file ? [{name: data?.fileName}] : []} disbaled={success} />
                  </Form.Item>
                  <Form.Item
                    initialValue={data.legalPersonName}
                    key="legalPersonName"
                    label="申请人/企业法人姓名"
                    name="legalPersonName"
                  >
                    <Input disabled={success} placeholder="请输入申请人或企业法人姓名" />
                  </Form.Item>
                  <Form.Item
                    initialValue={data.legalPersonCard}
                    key="legalPersonCard"
                    label="申请人/企业法人身份证号"
                    name="legalPersonCard"
                    rules={[
                      {
                        message: '请输入正确身份证号',
                        pattern: '^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$'
                      }
                    ]}
                  >
                    <Input disabled={success} placeholder="请输入申请人或企业法人身份证号码" />
                  </Form.Item>
                </Card>
                <Card hidden={!customer} title="3、可用短信条数设置" bordered={false} headStyle={{border: 'none'}}>
                  <Form.Item
                    initialValue={data.total}
                    key="total"
                    label="可用短信条数"
                    name="total"
                  >
                    <InputNumber disabled={success} placeholder="请输入租户可用短信条数" />
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
      <div className={styles.footer}>
        <div className={styles.check}>
          <Checkbox disabled={success} checked={checked} onChange={(e) => {
            setChecked(e.target.checked);
            if (errorText === '请阅读并同意《用户服务条款和用户隐私政策》') {
              setErrorText();
            }
          }}>阅读并同意 <a>《用户服务条款和用户隐私政策》</a>
          </Checkbox>
        </div>
        <div>
          <Button
            loading={loading}
            disabled={success}
            size="large"
            type="primary"
            style={{minWidth: '10vw'}}
            onClick={() => submit()}>{success ? '已提交申请，请耐心等待' : '提交申请'}
          </Button>
        </div>
        <div hidden={!errorText} className={styles.error}>
          <Space>
            <ExclamationCircleFilled />{errorText}
          </Space>
        </div>
        <div hidden={!success}>
          <Button type="link" onClick={() => {
            clear();
          }}>{(customer || login) ? '返回' : '返回登录页面'}</Button>
        </div>
      </div>
    </Drawer>
  </>;
};

export default AccountAsk;
