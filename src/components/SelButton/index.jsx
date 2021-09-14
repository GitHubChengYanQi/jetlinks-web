import React from 'react';
import {Button, message, Modal} from 'antd';
import { SelectOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';

const SelButton = ({
  onSuccess = () => {
  }, onCancel = () => {
  }, api, rowKey, data, children, icon,...props
}) => {


  if (!api) {
    api = {};
    console.warn('SelButton Component: api cannot be empty,But now it doesn\'t exist!');
  }

  if (!rowKey) {
    rowKey = api.rowKey || 'id';
  }

  const {run} = useRequest(api, {
    manual: true,
    onError(err){
      message.error(err.message);
    }
  });

  const onClick = () => {
    Modal.confirm({
      title: '提示',
      content: '确认是否多选？',
      confirmLoading: true,
      onOk: async () => {
        // const params = {};
        // params[rowKey] = value;
        try {
          await run({
            data: api.method==='POST' && data,
            params: api.method==='GET' && data,
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
    <Button
      size="small" onClick={onClick}  icon={icon ||  <SelectOutlined />}
      type="primary" {...props} >{children}</Button>
  );
};

export default SelButton;
