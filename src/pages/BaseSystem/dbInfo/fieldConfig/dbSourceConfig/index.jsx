import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import Swagger from '@/pages/BaseSystem/dbInfo/fieldConfig/dbSourceConfig/swagger';

const DbSourceConfig = (
  {
    value,
    onChange = () => {
    }
  }
) => {

  const ref = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (typeof value !== 'object') {
    return (<span>无需配置</span>);
  }
  const renderButton = () => {
    switch (value.type) {
      case 'select':
      case 'cascader':
        return (
          <>
            <Button onClick={() => {
              setIsModalVisible(true);
            }}>
              {value.config?`接口：${value.config.apiUrl}`:'选择数据接口'}</Button>
          </>
        );
      case 'checkbox':
        return (
          <>
            <Button>配置</Button>
          </>
        );
      default:
        return (<span>无需配置</span>);
    }
  };

  const renderForm = () => {
    switch (value.type) {
      case 'select':
      case 'cascader':
        return (
          <>
            <Swagger ref={ref}/>
          </>
        );
      case 'checkbox':
        return (
          <>
            <Button>配置</Button>
          </>
        );
      default:
        return (<span>无配置</span>);
    }
  };

  return (
    <>
      {renderButton()}
      <Modal
        title="配置数据"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        onOk={() => {
          // console.log(ref.current.getConfig());
          const config = ref.current.getConfig();
          if (config) {
            onChange({
              ...value,
              config
            });
          }
          setIsModalVisible(false);
        }}
      >
        {renderForm()}
      </Modal>
    </>
  );
};

export default DbSourceConfig;
