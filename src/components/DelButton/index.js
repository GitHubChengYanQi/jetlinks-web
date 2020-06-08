import React from 'react';
import {Button, Dialog} from '@alifd/next';

const DelButton = ({onSuccess, onCancel,other}) => {

  const onClick = () => {
    Dialog.confirm({
      title: '提示',
      content: '删除后不可恢复，是否确认删除？',
      onOk: () => {
        typeof onSuccess==='function' && onSuccess();
      },
      onCancel: () => {
        typeof onCancel==='function' && onCancel();
      }
    });
  }
  return (
    <Button {...other} type='primary' warning onClick={onClick}>删除</Button>
  );
}

export default DelButton;