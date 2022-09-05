import React, {useState} from 'react';
import {Alert, Button, Tabs} from 'antd';
import {QrcodeOutlined} from '@ant-design/icons';
import style from './index.module.less';
import logo from '../../asseset/imgs/logo.png';
import {CorporateName, UserName, Password, Phone, Code} from './Components';
import AccountAsk from './AccountAsk';
import cookie from "js-cookie";
import { useRequest } from '@/util/Request';
import { login as loginUrl } from '@/Config/ApiUrl';
import {getSearchParams, useHistory} from "../../../.ice";

interface Props {
  settings: any;
  location: any;
}

const Login: React.FC<Props> = props => {
  const history = useHistory();
  const params = getSearchParams();

  const [corporateName, setCorporateName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [expires, setExpires] = useState<number>(3600000);

  const [askAccount, setAskAccount] = useState(false);

  const [code, setCode] = useState<string>('');

  const {run,error,data, loading} = useRequest(loginUrl, {
    manual: true,
    ready: true,
  });

  const handleSubmit = async () => {
    const response = await run({
      data: {username, password}
    });
    if (response) {
      cookie.set('tianpeng-token', response);
      setTimeout(() => {
        if (params.backUrl) {
          window.location.href = decodeURIComponent(params.backUrl);
        } else {
          history.replace('/');
        }
      }, 1500);
    }
  };


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

        <Tabs defaultActiveKey="1" centered className={style.tab}>
          <Tabs.TabPane tab="账号密码登陆" key="1">
            <CorporateName corporateName={corporateName} setCorporateName={setCorporateName}/>
            <UserName username={username} setUsername={setUsername}/>
            <Password password={password} setPassword={setPassword}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="手机验证码登陆" key="2">
            <CorporateName corporateName={corporateName} setCorporateName={setCorporateName}/>
            <Phone phone={phone} setPhone={setPhone}/>
            <Code
              phoneCode
              code={code}
              setCode={setCode}
              handleSubmit={handleSubmit}
            />
          </Tabs.TabPane>
        </Tabs>


        <div className={style.remember}>
          <div className={style.remember_box}>
            <input
              type="checkbox"
              checked={expires === -1}
              onChange={() => {
                setExpires(expires === -1 ? 3600000 : -1);
              }}
            />
            <div className={style.text}>记住我</div>
          </div>
        </div>

        <Button
          loading={loading}
          onClick={() => {
            handleSubmit();
          }}
          className={style.btn}
        >{loading ? '登录中' : '登录'}</Button>

        <div style={{marginTop:16}}>
          {error && <Alert message={error.message} type="error"/>}
          {data && <Alert message='登录成功，请稍候...' type='success'/>}
        </div>

        <div className={style.footer}>
          <div className={style.add}>
            没有账号，<Button type='link' onClick={() => setAskAccount(true)}>立即申请</Button>
          </div>
          <div className={style.find}>
            找回密码
          </div>
        </div>
        <div className={style.other}>
          <div/>
          <span><QrcodeOutlined/></span>
        </div>
      </div>
    </div>
    <AccountAsk visible={askAccount} onClose={() => setAskAccount(false)}/>
  </div>;
};
export default Login;
