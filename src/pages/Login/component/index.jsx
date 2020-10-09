import React, {useState} from 'react';
import {Message} from '@alifd/next';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const FormItem = Form.Item;

export default function Login({loading, onClick, submitText, ...others}) {

  const [result, setResult] = useState(null);

  const doLogin = async (values, errors) => {

  };

  return (
    <Form
      initialValues={{remember: true}}
      onFinish={async (values) => {
        if (typeof onClick === 'function') {
          const result = await onClick(values);
          setResult(result);
        }
      }}
    >
      <FormItem
        name="username"
        rules={[{required: true, message: '请填写：手机号/邮箱/账号'}]}
      >
        <Input
          prefix={<UserOutlined/>}
          name="account"
          placeholder="手机号/邮箱/账号"
        />
      </FormItem>
      <FormItem
        name="password"
        rules={[
          {required: true, message: '请填写密码'},
          () => ({
            validator(rule, value) {
              if (!value || value.length > 6) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密码长度不应低于6位!'));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined/>}
          type="password"
          placeholder="请填写最低长度为6位的密码"
        />
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit" block>
          {submitText || `登 录`}
        </Button>
      </FormItem>
      {result && <Message title={result.title} type={result.type}>
        {result.message}
      </Message>}
    </Form>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

