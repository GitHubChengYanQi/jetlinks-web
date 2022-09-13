import React, {useState} from 'react';
import classNames from 'classnames';
import {HomeOutlined, LockOutlined, UserOutlined, MobileOutlined, VerifiedOutlined} from '@ant-design/icons';
import style from '../index.module.less';

export const Code = (
  {
    handleSubmit = () => {
    },
    setCode = () => {
    },
    code = '',
  }) => {

  const [blur, setBlur] = useState(false);

  return <div className={classNames(style.item, blur && style.check)}>
    <div className={style.userLabel}><VerifiedOutlined/></div>
    <input
      onBlur={() => setBlur(false)}
      onFocus={() => setBlur(true)}
      onKeyUp={e => {
        if (e.keyCode === 13) {
          handleSubmit();
        }
      }}
      placeholder='请输入验证码'
      onChange={e => setCode(e.target.value)}
      value={code}
      type="text"
    />
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
      placeholder='请输入账号'
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
      placeholder='请输入企业名称'
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
      placeholder='请输入手机号'
      onChange={e => setPhone(e.target.value)}
      value={phone}
      type="text"
    />
  </div>;
};

export const Password = (
  {
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
      onBlur={() => setBlur(false)}
      onFocus={() => setBlur(true)}
      placeholder='请输入密码'
      onChange={e => setPassword(e.target.value)}
      value={password}
      type="password"
    />
  </div>;
};
