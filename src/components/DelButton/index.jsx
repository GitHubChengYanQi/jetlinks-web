import React from 'react';
import {Button, Modal} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';

const DelButton = ({
                     onSuccess = () => {
                     }, onCancel = () => {
  }, api, rowKey, value, ...props
                   }) => {

  if (!api) {
    api = {};
    console.error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }

  if (!rowKey) {
    rowKey = api.rowKey || 'id';
  }

  const {run} = useRequest(api, {
    manual: true
  });

  const onClick = () => {
    Modal.confirm({
      title: '提示',
      content: '删除后不可恢复，是否确认删除？',
      confirmLoading: true,
      onOk: async () => {
        const params = {};
        params[rowKey] = value;
        try {
          await run({
            data: params,
            params
          });
          onSuccess();
          return new Promise((resolve, reject) => {
            resolve();
          });
        } catch (e) {
          return new Promise((resolve, reject) => {
            reject(new Error(e.message));
          });
        }
      },
      onCancel: () => {
        onCancel();
      }
    });
  };

  return (
    <Button  {...props} danger onClick={onClick} className="button-left-margin" icon={<DeleteOutlined/>}>删除</Button>
  );
};

export default DelButton;
