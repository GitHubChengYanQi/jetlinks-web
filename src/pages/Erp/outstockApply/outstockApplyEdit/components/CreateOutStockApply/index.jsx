import Modal from '@/components/Modal';
import {Button, Space} from 'antd';
import React, {useImperativeHandle, useRef, useState} from 'react';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import OutstockApplyEdit from '@/pages/Erp/outstockApply/outstockApplyEdit';


const CreateOutStockApply = ({
  onSuccess,
  title,
  width,
  onChange,
  ...props
}, ref) => {


  const compoentRef = useRef(null);
  const modalRef = useRef(null);

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
    } title={title}  >
      <OutstockApplyEdit value={value} ref={compoentRef} onSuccess={()=>{
        onSuccess();
      }} onChange={(res)=>{
        typeof onChange === 'function' && onChange(res);
      }}  />
    </Modal>
  );
};

export default React.forwardRef(CreateOutStockApply);
