import Modal from '@/components/Modal';
import {Button, Space} from 'antd';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import React, {useRef} from 'react';
import Title from '@/components/Title';


const CreateNewCustomer = ({
  onSuccess,
  title,
  model,
  widths,
  refModal,
  ...props
}) => {

  const compoentRef = useRef();

  return (
    <Modal compoentRef={compoentRef} padding='0' width={widths} footer={
      <>
        <Space>
          <Button type="primary" onClick={() => {
            compoentRef.current.formRef.current.submit();
          }}>保存</Button>
          <Button onClick={() => {
            refModal.current.close();
          }}>取消</Button>
        </Space>
      </>
    } title={title} component={model} onSuccess={() => {
      typeof onSuccess === 'function' && onSuccess();
    }} ref={refModal} {...props} />
  );
};

export default CreateNewCustomer;
