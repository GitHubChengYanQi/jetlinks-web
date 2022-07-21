import React, {useImperativeHandle, useRef, useState} from 'react';
import {Button, Result} from 'antd';
import {useHistory} from 'ice';
import Modal from '@/components/Modal';

const ModalMessage = (
  {
    headTitle,
  }, ref) => {

  const modalRef = useRef();

  const history = useHistory();

  const [result, setResult] = useState({});

  const success = ({title, noCancel, onCancel, onOk, onClose}) => {
    setResult({title, status: 'success', noCancel, onCancel, onOk, onClose});
    modalRef.current.open(false);
  };

  const error = ({title, noCancel, onCancel, onOk, onClose}) => {
    setResult({title, status: 'error', noCancel, onCancel, onOk, onClose});
    modalRef.current.open(false);
  };

  useImperativeHandle(ref, () => ({
    success,
    error,
  }));

  return <Modal
    onClose={() => {
      if (typeof result.onClose === 'function') {
        result.onClose();
      }
    }}
    headTitle={headTitle || '提示'}
    ref={modalRef}
    footer={[
      <Button key={0} hidden={result.noCancel} onClick={() => {
        if (typeof result.onCancel === 'function') {
          result.onCancel();
        } else {
          history.goBack();
        }
        modalRef.current.close();
      }}>返回</Button>,
      <Button key={1} type="primary" onClick={() => {
        if (typeof result.onOk === 'function') {
          result.onOk();
        }
        modalRef.current.close();
      }}>继续操作</Button>
    ]}
  >
    <Result
      status={result.status || 'success'}
      title={result.title || '结果'}
    />
  </Modal>;

};

export default React.forwardRef(ModalMessage);
