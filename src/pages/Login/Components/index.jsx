import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import {HomeOutlined, LockOutlined, UserOutlined, MobileOutlined, VerifiedOutlined} from '@ant-design/icons';
import {Button, message} from 'antd';
import style from '../index.module.less';
import request from '../../../util/Request/request';
import {useRequest} from '@/util/Request';

export const Code = (
  {
    setCode = () => {
    },
    code = '',
    phone = ''
  }) => {

  const [blur, setBlur] = useState(false);

  return <div className={classNames(style.item, blur && style.check)}>
    <div className={style.userLabel}><VerifiedOutlined/></div>

    <input
      onBlur={() => setBlur(false)}
      onFocus={() => setBlur(true)}
      placeholder="请输入验证码"
      onChange={e => setCode(e.target.value)}
      value={code}
      type="text"
    />
    <SendCode phone={phone}/>
  </div>;
};

export const UserName = (
  {
    username = '',
    setUsername = () => {
    },
  }) => {

  const [blur, setBlur] = useState(false);

  return <div className={classNames(style.item, blur && style.check)}>
    <div className={style.userLabel}><UserOutlined/></div>
    <input
      onBlur={() => setBlur(false)}
      onFocus={() => setBlur(true)}
      placeholder="请输入账号"
      onChange={e => setUsername(e.target.value)}
      value={username}
      type="text"
    />
  </div>;
};

export const CorporateName = (
  {
    corporateName = '',
    setCorporateName = () => {
    },
  }) => {

  const [blur, setBlur] = useState(false);

  return <div className={classNames(style.item, blur && style.check)}>
    <div className={style.userLabel}><HomeOutlined/></div>
    <input
      onBlur={() => setBlur(false)}
      onFocus={() => setBlur(true)}
      placeholder="请输入企业名称"
      onChange={e => setCorporateName(e.target.value)}
      value={corporateName}
      type="text"
    />
  </div>;
};

export const Phone = (
  {
    phone = '',
    setPhone = () => {
    },
  }) => {

  const [blur, setBlur] = useState(false);

  return <div className={classNames(style.item, blur && style.check)}>
    <div className={style.userLabel}><MobileOutlined/></div>
    <input
      onBlur={() => setBlur(false)}
      onFocus={() => setBlur(true)}
      placeholder="请输入手机号"
      onChange={e => setPhone(e.target.value)}
      value={phone}
      type="text"
    />
  </div>;
};

export const Password = (
  {
    autoComplete,
    placeholder,
    password = '',
    setPassword = () => {
    },
  }) => {

  const [blur, setBlur] = useState(false);

  return <div className={classNames(style.item, blur && style.check)}>
    <div className={style.userLabel}>
      <LockOutlined/>
    </div>
    <input
      autoComplete={autoComplete}
      onBlur={() => setBlur(false)}
      onFocus={() => setBlur(true)}
      placeholder={placeholder || '请输入密码'}
      onChange={e => setPassword(e.target.value)}
      value={password}
      type="password"
    />
  </div>;
};


export const SendCode = ({phone}) => {
  const [count, setCount] = useState(60);
  const [isShow, setShow] = useState(false);

  const TimeRef = useRef();
  const hClick = () => {
    setShow(true);
    TimeRef.current = setInterval(() => {
      setCount(count => {
        if (count === 0) {
          // 清除定时器
          clearInterval(TimeRef.current);
          // 启用按钮
          setShow(false);
          setCount(60);
        }
        return count - 1;
      });
    }, 1000);
  };

  const {loading,run} = useRequest({url: '/sms/sendCode', method: 'POST'},{
    manual:true,
    onSuccess:()=>{
      message.warn('验证码已发送，请注意查收!');
      hClick();
    }
  });

  return <div>
    <Button
      loading={loading}
      className={style.sendCode}
      type="primary"
      ghost
      onClick={async () => {
        if (phone) {
          run({data:{account: phone}});
        } else {
          message.warn('请输入手机号!');
        }
      }}
      disabled={isShow}
    >{isShow ? `${count}秒后再试` : '发送验证码'}</Button>
  </div>;
};
