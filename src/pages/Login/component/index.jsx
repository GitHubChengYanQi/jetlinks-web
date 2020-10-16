import React, {useState} from 'react';
import {Form, Input, Button, message, Alert} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory} from "ice";
import {useRequest} from "@/Config/Request";
import {login as loginUrl} from "@/Config/ApiUrl";

const FormItem = Form.Item;

export default function Login({loading, onClick, submitText, ...others}) {

  const history = useHistory();

  const {run, data} = useRequest(loginUrl, {
    manual: true
  });

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
              if (!value || value.length >= 6) {
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
      {result && <Alert title={result.title} type={result.type}>
        {result.message}
      </Alert>}
    </Form>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

