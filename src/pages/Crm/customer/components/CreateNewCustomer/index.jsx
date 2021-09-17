import Modal from '@/components/Modal';
import {Button, Space} from 'antd';
import React, {useImperativeHandle, useRef, useState} from 'react';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';


const CreateNewCustomer = ({
  onSuccess,
  title,
  widths,
  onChange,
  ...props
}, ref) => {


  const compoentRef = useRef();
  const modalRef = useRef();

  const [value,setValue] = useState();



  const open = (value) => {
    setValue(value);
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
    <Modal ref={modalRef} padding="0" width={widths} footer={
      <>
        <Space>
          <Button type="primary" onClick={() => {
            compoentRef.current.formRef.current.submit();
          }}>保存</Button>
          <Button onClick={() => {
            // refModal.current.close();
          }}>取消</Button>
        </Space>
      </>
    } title={title}  >
      <CustomerEdit value={value} ref={compoentRef} onSuccess={()=>{
        onSuccess();
      }} onChange={(res)=>{
        typeof onChange === 'function' && onChange(res);
      }}  />
    </Modal>
  );
};

export default React.forwardRef(CreateNewCustomer);
