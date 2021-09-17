import Modal from '@/components/Modal';
import {Button, Space} from 'antd';
import React, {useImperativeHandle, useRef} from 'react';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';


const CreateNewCustomer = ({
  onSuccess,
  title,
  widths,
  ...props
}, ref) => {

  const compoentRef = useRef();
  const modalRef = useRef();

  const open = () => {
    // crmBusinessSalesRun();
    modalRef.current.open(false);
  };

  const close = () => {
    // setIsModalVisible(false);
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
    } title={title} onSuccess={() => {
      typeof onSuccess === 'function' && onSuccess();
    }} {...props} >
      <CustomerEdit value={false} />
    </Modal>
  );
};

export default React.forwardRef(CreateNewCustomer);
