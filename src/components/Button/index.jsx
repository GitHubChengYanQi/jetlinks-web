import {Button} from 'antd';
import React from 'react';

export const ActionButton = ({
  onClick = () => {
  },
  children,
  ...props
}) => {
  return <Button {...props} className="bgGreen" onClick={onClick}>{children}</Button>;
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
