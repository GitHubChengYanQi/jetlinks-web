import React from 'react';
import {Button, Modal} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

const DelButton = ({onSuccess, onCancel, ...props}) => {

  const onClick = () => {
    Modal.confirm({
      title: '提示',
      content: '删除后不可恢复，是否确认删除？',
      confirmLoading: true,
      onOk: () => {
        return new Promise((resolve, reject) => {
          const k = Math.random();
          console.log(k);
          setTimeout(k > 0.5 ? resolve : () => {
            reject(new Error('删除失败'));
          }, 1000);
        }).catch(() => {
          console.log('Oops errors!');
        });
        // typeof onSuccess === 'function' && onSuccess();
        // return false;
      },
      onCancel: () => {
        typeof onCancel === 'function' && onCancel();
      }
    });
  };

  return (
    <Button {...props} danger onClick={onClick} className="button-left-margin" icon={<DeleteOutlined />}>删除</Button>
  );
};

export default DelButton;
