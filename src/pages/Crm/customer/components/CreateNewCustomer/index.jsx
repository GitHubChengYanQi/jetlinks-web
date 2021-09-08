import Modal from '@/components/Modal';
import {Button} from 'antd';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import React, {useRef} from 'react';


const CreateNewCustomer = ({
  onSuccess,
  model,
  widths,
  refModal,
  ...props
}) => {


  const compoentRef = useRef();

  return (
    <Modal compoentRef={compoentRef} width={widths} footer={
      <>
        <Button type="primary" onClick={() => {
          compoentRef.current.formRef.current.submit();
        }}>保存</Button>
        <Button onClick={() => {
          refModal.current.close();
        }}>取消</Button>
      </>
    } title="客户" component={model} onSuccess={() => {
      typeof onSuccess === 'function' && onSuccess();
    }} ref={refModal} {...props} />
  );
};

export default CreateNewCustomer;
