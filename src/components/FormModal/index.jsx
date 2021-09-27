import Modal from '@/components/Modal';
import OutstockApplyEdit from '@/pages/Erp/outstockApply/outstockApplyEdit';
import {Button, Space} from 'antd';
import React, {useImperativeHandle, useRef, useState} from 'react';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';


const FormModal = ({title,width,component,onSuccess},ref) => {

  const modalRef = useRef();

  const compoentRef = useRef(null);



  const open = (value) => {
    modalRef.current.open(value);
  };

  const close = () => {
    modalRef.current.close();
  };

  useImperativeHandle(ref, () => ({
    open,
    close
  }));

  return (
    <Modal ref={modalRef} padding="0" width={width} footer={
      <>
        <Space>
          <Button type="primary" onClick={() => {
            compoentRef.current.formRef.current.submit();
          }}>保存</Button>
          <Button onClick={() => {
            close();
          }}>取消</Button>
        </Space>
      </>
    } title={title} component={component} compoentRef={compoentRef} onSuccess={()=>{
      onSuccess();
    }}  />
  );
};

export default React.forwardRef(FormModal);
