import Modal from '@/components/Modal';
import {Button, Space} from 'antd';
import React, {useImperativeHandle, useRef, useState} from 'react';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';


const CreateNewCustomer = ({
  onSuccess,
  title,
  widths,
  onChange,
  wxUser,
  supply,
  ...props
}, ref) => {


  const compoentRef = useRef(null);
  const modalRef = useRef(null);

  const [value,setValue] = useState();

  const [user,setUser] = useState();


  const User = (value) =>{
    setUser(value);
  };

  const open = (value) => {
    setValue(value);
    modalRef.current.open(value);
  };

  const close = () => {
    modalRef.current.close();
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
    User
  }));

  return (
    <Modal ref={modalRef} padding="0" width={widths} footer={
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
    } title={title}  >
      <CustomerEdit value={value} supply={supply} wxUser={user} ref={compoentRef} onSuccess={()=>{
        onSuccess();
      }} onChange={(res)=>{
        typeof onChange === 'function' && onChange(res);
      }}  />
    </Modal>
  );
};

export default React.forwardRef(CreateNewCustomer);
