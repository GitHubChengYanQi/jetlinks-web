import React from 'react';
import {Button, Input} from 'antd';
import Warning from '@/components/Warning';

interface Props {
  value?: any;
  onChange?: any;
  onReset?: any;
  initPassword?: any;
  disabled?: any;
  inputDisabled?: any;
  placeholder?: any;
  reset?: boolean;
  visibilityToggle?: boolean;
}

const Password: React.FC<Props> = (props) => {

  const {
    inputDisabled,
    reset,
    value,
    visibilityToggle,
    onChange,
    onReset = () => {
    },
    initPassword = () => {
    },
    disabled,
    placeholder
  } = props;

  return <Input.Group>
    <Input.Password
      visibilityToggle={visibilityToggle}
      autoComplete='new-password'
      disabled={disabled || inputDisabled}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{width: reset ? 'calc(100% - 90px)' : ''}}
    />
    <div hidden={!reset} style={{display: 'inline-block'}}>
      <Warning disabled={disabled} content='您确定要重置密码么？重置后默认初始密码为手机号后六位' onOk={() => {
        onChange(initPassword());
        onReset(initPassword());
      }}>
        <Button disabled={disabled} type="primary" ghost>重置密码</Button>
      </Warning>
    </div>
  </Input.Group>;
};

export default Password;
