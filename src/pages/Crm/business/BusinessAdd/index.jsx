import React, {useImperativeHandle, useState} from 'react';
import {Modal} from 'antd';

const BusinessAdd = (props, ref) => {

  const {onClose} = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const open = () => {
    setIsModalVisible(true);
  };

  const close = () => {
    setIsModalVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open,
    close
  }));

  return (
    <Modal title="Basic Modal" visible={isModalVisible} onCancel={()=>{
      typeof onClose==='function' && onClose();
    }}>
      <div style={{maxHeight:'100vh'}}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </div>

    </Modal>
  );
};

export default React.forwardRef(BusinessAdd);
