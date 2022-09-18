import React, {useState} from 'react';
import {Alert, Button, Tabs} from 'antd';
import {QrcodeOutlined} from '@ant-design/icons';
import cookie from 'js-cookie';
import {getSearchParams, useHistory} from 'ice';
import style from './index.module.less';
import logo from '../../asseset/imgs/logo.png';
import {CorporateName, UserName, Password, Phone, Code} from './Components';
import AccountAsk from './AccountAsk';
import {useRequest} from '@/util/Request';
import {login as loginUrl} from '@/Config/ApiUrl';


const Login = () => {
  const history = useHistory();
  const params = getSearchParams();

  const adminLogin = history.location.pathname === '/adminLogin';

  const [corporateName, setCorporateName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [key, setKey] = useState('');

  const [findPassword, setFindPassword] = useState(false);

  const [askAccount, setAskAccount] = useState(false);

  const [code, setCode] = useState('');

  const {run, error, data, loading} = useRequest(loginUrl, {
    manual: true,
    ready: true,
  });

  const handleSubmit = async () => {
    const response = await run({
      data: {username, password, customerName: corporateName}
    });
    if (response) {
      cookie.set('jetlink-token', response);
      setTimeout(() => {
        if (params.backUrl) {
          window.location.href = decodeURIComponent(params.backUrl);
        } else {
          history.replace('/');
        }
      }, 1500);
    }
  };

  const tabItems = findPassword ? [
    {
      label: '身份验证找回  ',
      key: 'item-1',
      children: <>
        <CorporateName corporateName={corporateName} setCorporateName={setCorporateName}/>
        <Phone phone={phone} setPhone={setPhone}/>
        <Code
          phoneCode
          code={code}
          setCode={setCode}
          handleSubmit={handleSubmit}
        />
        <Password password={password} setPassword={setPassword}/>
      </>
    },
    {
      label: '人工申诉',
      key: 'user',
      children: <div style={{padding: 24,textAlign:'center'}}>
        售后电话：400-017-0188
      </div>
    },
  ] : [
    {
      label: '账号密码登陆',
      key: 'item-1',
      children: <>
        <CorporateName corporateName={corporateName} setCorporateName={setCorporateName}/>
        <UserName username={username} setUsername={setUsername}/>
        <Password password={password} setPassword={setPassword}/>
      </>
    },
    {
      label: '手机验证码登陆',
      key: 'item-2',
      children: <>
        <CorporateName corporateName={corporateName} setCorporateName={setCorporateName}/>
        <Phone phone={phone} setPhone={setPhone}/>
        <Code
          phoneCode
          code={code}
          setCode={setCode}
          handleSubmit={handleSubmit}
        />
      </>
    },
  ];

  return <div className={style.login}>
    <div className={style.box}>
      <div className={style.box1}>
        <div className={style.header}>
          <div className={style.headerLeft}/>
          <div className={style.title}>设备业务云平台</div>
          <div className={style.headerRight}/>
        </div>
        <div className={style.logo}>
          <img width={100} src={logo} alt=""/>
        </div>

        <Tabs onChange={setKey} items={adminLogin ? [{
          label: '管理员登陆',
          key: 'item-1',
          children: <>
            <UserName username={username} setUsername={setUsername}/>
            <Password password={password} setPassword={setPassword}/>
          </>
        }] : tabItems} defaultActiveKey="1" centered className={style.tab}/>

        {key !== 'user' && <Button
          htmlType="submit"
          loading={loading}
          onClick={() => {
            handleSubmit();
          }}
          className={style.btn}
        >{loading ? '登录中' : '登录'}</Button>}

        <div style={{marginTop: 16}}>
          {error && <Alert message={error.message} type="error"/>}
          {data && <Alert message="登录成功，请稍候..." type="success"/>}
        </div>

        <div className={style.footer}>
          <div className={style.add}>
            没有账号，<span className='blue' onClick={() => setAskAccount(true)}>立即申请</span>
          </div>
          <div className={style.find} onClick={() => setFindPassword(!findPassword)}>
            {findPassword ?
              <>已有账号，<span className="blue">立即登陆</span></> : '找回密码'}
          </div>
        </div>
        <div className={style.other} hidden={findPassword}>
          <div/>
          <span><QrcodeOutlined/></span>
        </div>
      </div>
    </div>
    <AccountAsk visible={askAccount} onClose={() => setAskAccount(false)}/>
  </div>;
};
export default Login;
