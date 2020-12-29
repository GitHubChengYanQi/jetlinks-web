import React,{useState} from 'react';
import {Button,Modal} from 'antd';

const DbSourceConfig = ({value}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (typeof value !== 'object') {
    return (<span>无需配置</span>);
  }
  const renderButton = () => {
    switch (value.type) {
      case 'select':
        return (
          <>
            <Button onClick={()=>{
              setIsModalVisible(true);
            }}>选择数据接口</Button>
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

  const renderForm = ()=>{
    switch (value.type) {
      case 'select':
        return (
          <>
            <Button>选择数据接口</Button>

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
        visible={isModalVisible}
      >
        {renderForm()}
      </Modal>
    </>
  );

};

export default DbSourceConfig;
