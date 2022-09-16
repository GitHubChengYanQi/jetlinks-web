import {Button} from 'antd';
import React from 'react';

export const ActionButton = ({
  onClick = () => {
  },
  children,
  disabled,
  ...props
}) => {
  return <Button disabled={disabled} {...props} className={!disabled && 'bgGreen'}
                 onClick={onClick}>{children}</Button>;
};

export const DangerButton = ({
  onClick = () => {
  },
  children,
  ...props
}) => {
  return <Button {...props} type="primary" danger onClick={onClick}>{children}</Button>;
};

export const PrimaryButton = ({
  onClick = () => {
  },
  children,
  ...props
}) => {
  return <Button {...props} type="primary" onClick={onClick}>{children}</Button>;
};

export const LinkButton = ({
  onClick = () => {
  },
  children,
  ...props
}) => {
  return <Button {...props} type="link" className="blue" onClick={onClick}>{children}</Button>;
};
