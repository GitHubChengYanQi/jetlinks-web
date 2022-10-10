import React from 'react';
import {Button, Input} from 'antd';
import Warning from '@/components/Warning';

const Password = (
  {
    loading,
    inputDisabled,
    reset,
    value,
    visibilityToggle,
    onChange,
    show,
    onReset = () => {
    },
    initPassword = () => {
    },
    disabled,
    placeholder,
    content,
  }
) => {

  return <Input.Group>
    <Input.Password
      hidden={show}
      visibilityToggle={visibilityToggle}
      autoComplete="new-password"
      disabled={disabled || inputDisabled}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{width: reset ? 'calc(100% - 90px)' : ''}}
    />
    <div hidden={!reset} style={{display: 'inline-block'}}>
      <Warning disabled={disabled} content={content || '您确定要重置密码么？重置后默认初始密码为手机号后六位'} onOk={() => {
        onChange(initPassword());
        onReset(initPassword());
      }}>
        <Button
          loading={loading}
          style={{padding: show && 0}}
          disabled={disabled}
          type={show ? 'link' : 'primary'}
          ghost={!show}>重置密码</Button>
      </Warning>
    </div>
  </Input.Group>;
};

export default Password;
