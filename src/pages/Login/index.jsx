import React, {useState} from 'react';
import {Alert, Button, message, Tabs} from 'antd';
import {QrcodeOutlined} from '@ant-design/icons';
import cookie from 'js-cookie';
import {getSearchParams, useHistory} from 'ice';
import style from './index.module.less';
import logo from '../../asseset/imgs/logo.png';
import {CorporateName, UserName, Password, Phone, Code} from './Components';
import AccountAsk from './AccountAsk';
import {useRequest} from '@/util/Request';
import {findUserPassword, login as loginUrl, loginByPhone} from '@/Config/ApiUrl';


const Login = () => {
  const history = useHistory();
  const params = getSearchParams();

  const adminLogin = history.location.pathname === '/adminLogin';

  const loginInfo = JSON.parse(localStorage.getItem('loginInfo') || '{}');

  const [corporateName, setCorporateName] = useState(loginInfo.customerName);
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [code, setCode] = useState();

  const clear = () => {
    setPhone('');
    setUsername('');
    setPassword('');
    setCode('');
    setNewPassword('');
  };

  const [key, setKey] = useState('password');

  const [findPassword, setFindPassword] = useState(false);

  const [askAccount, setAskAccount] = useState(false);


  const {run, error: loginError, data: loginSuccess, loading} = useRequest(loginUrl, {
    manual: true, ready: true,
  });

  const {
    run: phoneLogin, error: phoneLoginError, data: phoneLoginSuccess, loading: phoneLoginLoading
  } = useRequest(loginByPhone, {
    manual: true, ready: true,
  });

  const {
    run: findPass, error: findPassError, data: findPassSuccess, loading: findPassLoading
  } = useRequest(findUserPassword, {
    manual: true, ready: true,
  });

  const loginOk = (token) => {
    cookie.set('jetlink-token', token);
    setTimeout(() => {
      if (params.backUrl) {
        window.location.href = decodeURIComponent(params.backUrl);
      } else {
        history.replace('/');
      }
    }, 1500);
  };
  const tip = () => {
    let error = '';
    let success = '';
    let successText = '登录成功，请稍候...';
    switch (key) {
      case 'password':
        error = loginError;
        success = loginSuccess;
        break;
      case 'phone':
        error = phoneLoginError;
        success = phoneLoginSuccess;
        break;
      case 'find':
        error = findPassError;
        success = findPassSuccess;
        successText = '密码找回成功,请重新登录';
        break;
      case 'user':
        console.log(key);
        break;
      default:
        break;
    }
    return <div style={{marginTop: 16}}>
      {error && <Alert message={error?.message || phoneLoginError?.message} type="error" />}
      {success && <Alert message={successText} type="success" />}
    </div>;
  };

  const tabItems = findPassword ? [{
    label: '身份验证找回  ', key: 'find', children: <>
      <CorporateName corporateName={corporateName} setCorporateName={setCorporateName} />
      <Phone phone={phone} setPhone={setPhone} />
      <Code
        phone={phone}
        code={code}
        setCode={setCode}
      />
      <Password
        autoComplete="new-password"
        placeholder="设置新密码 (6-18位字符组成)"
        password={password}
        setPassword={setPassword}
      />
      <Password
        autoComplete="new-password"
        placeholder="确认新密码 (6-18位字符组成)"
        password={newPassword}
        setPassword={setNewPassword}
      />
    </>
  }, {
    label: '人工申诉', key: 'user', children: <div style={{padding: 24, textAlign: 'center'}}>
      售后电话：400-017-0188
    </div>
  },] : [{
    label: '账号密码登录', key: 'password', children: <>
      <CorporateName corporateName={corporateName} setCorporateName={setCorporateName} />
      <UserName username={username} setUsername={setUsername} />
      <Password password={password} setPassword={setPassword} />
    </>
  }, {
    label: '手机验证码登录', key: 'phone', children: <>
      <CorporateName corporateName={corporateName} setCorporateName={setCorporateName} />
      <Phone phone={phone} setPhone={setPhone} />
      <Code
        phone={phone}
        code={code}
        setCode={setCode}
      />
    </>
  },];

  const buttonText = () => {
    if (key === 'find') {
      return (findPassLoading) ? '找回密码中' : '找回密码';
    }
    return (loading || phoneLoginLoading) ? '登录中' : '登录';
  };

  return <div className={style.login}>
    <div className={style.box}>
      <div className={style.box1}>
        <div className={style.header}>
          <div className={style.headerLeft} />
          <div className={style.title}>设备业务云平台</div>
          <div className={style.headerRight} />
        </div>
        <div hidden className={style.logo}>
          <img width={100} src={logo} alt="" />
        </div>

        <Tabs activeKey={key} onChange={(key) => {
          clear();
          setKey(key);
        }} items={adminLogin ? [{
          label: '管理员登录', key: 'item-1', children: <>
            <UserName username={username} setUsername={setUsername} />
            <Password password={password} setPassword={setPassword} />
          </>
        }] : tabItems} defaultActiveKey="1" centered className={style.tab} />

        {key !== 'user' && <Button
          htmlType="submit"
          loading={loading || phoneLoginLoading || findPassLoading}
          onClick={async () => {
            let token = '';
            let loginInfo = '';
            switch (key) {
              case 'password':
                token = await run({
                  data: {username, password, customerName: corporateName}
                });
                loginInfo = JSON.stringify({customerName: corporateName});
                break;
              case 'phone':
                token = await phoneLogin({
                  data: {account: phone, code, customerName: corporateName}
                });
                loginInfo = JSON.stringify({customerName: corporateName});
                break;
              case 'find':
                if (password !== newPassword) {
                  message.warn('两次密码输入不一致！');
                  return;
                } else if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,18}$/.test(password)) {
                  message.warn('密码包含6~18位字母、数字、特殊符号的2种或多种组合！');
                  return;
                }
                findPass({
                  data: {account: phone, code, customerName: corporateName, password}
                });
                break;
              case 'user':
                console.log(key);
                break;
              default:
                break;
            }
            if (token) {
              localStorage.setItem('loginInfo', loginInfo);
              loginOk(token);
            }
          }}
          className={style.btn}
        >{buttonText()}</Button>}

        {tip()}

        <div className={style.footer}>
          <div className={style.add}>
            没有账号，<span className="blue" onClick={() => setAskAccount(true)}>立即申请</span>
          </div>
          <div className={style.find} onClick={() => {
            clear();
            setKey(findPassword ? 'password' : 'find');
            setFindPassword(!findPassword);
          }}>
            {findPassword ? <>已有账号，<span className="blue">立即登录</span></> : '找回密码'}
          </div>
        </div>
        <div className={style.other} hidden>
          <div />
          <span><QrcodeOutlined /></span>
        </div>
      </div>
    </div>
    <AccountAsk visible={askAccount} onClose={() => setAskAccount(false)} />
  </div>;
};
export default Login;
