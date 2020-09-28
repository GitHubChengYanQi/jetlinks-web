import React, {useState} from 'react';
import {Message} from '@alifd/next';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const FormItem = Form.Item;

export default function Login({loading, onClick, submitText, ...others}) {

  const [result, setResult] = useState(null);

  const doLogin = async (values, errors) => {
    if (typeof onClick === 'function') {
      const result = await onClick(values, errors);
      setResult(result);
    }
  };

  return (
    <Form
      initialValues={{remember: true}}
      onFinish={() => {
      }}
    >
      <FormItem
        name="username"
        rules={[{required: true, message: '请填写：手机号/邮箱/账号'}]}
      >
        <Input
          prefix={<UserOutlined />}
          name="account"
          placeholder="手机号/邮箱/账号"
        />
      </FormItem>
      <FormItem
        minmaxLengthMessage="密码长度输入错误：不低于6位"
        name="password"
        rules={[{required: true, message: '请填写密码'}]}
      >
        <Input
          prefix={<LockOutlined />}
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

