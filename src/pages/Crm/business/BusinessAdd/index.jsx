import React, {useImperativeHandle, useRef, useState} from 'react';
import {Button, Spin} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
import BusinessTableIndex from '@/pages/Crm/business/BusinessAdd/components/businessTableIndex';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';
import Modal from '@/components/Modal';
import styles from './index.module.scss';

const BusinessAdd = (props, ref) => {

  const {onClose} = props;
  const submitRef = useRef(null);
  const modalRef = useRef(null);

  const [ ,setIsModalVisible] = useState(false);
  const [useData, setData] = useState([]);
  const [disable, setDisable] = useState(1);
  const [businessId, setBusinessId] = useState(null);
  const {data, run: crmBusinessSalesRun} = useRequest({
    url: '/crmBusinessSales/list',
    method: 'POST',
    rowKey: 'salesId',
  });

  const open = () => {
    crmBusinessSalesRun();
    modalRef.current.open(false);
  };

  const close = () => {
    setIsModalVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open,
    close
  }));

  const width = () => {
    switch (disable) {
      case 1:
        return 360;
      case 2:
        return 850;
      case 3:
        return 360;
      default:
        return 360;
    }
  };

  return (
    <Modal
      compoentRef={submitRef}
      ref={modalRef}
      title={<div>
        <div style={disable === 2 ? {display: 'inline'} : {'display': 'none'}}>
          <LeftOutlined
            onClick={() => {
              setDisable(disable > 1 ? disable - 1 : 1);
            }} /></div>
        <div style={{marginLeft: '40%', display: 'inline'}}>
          {disable===1&&'选择分类'}
          {disable===2&&'添加项目'}
          {disable===3&&'完成'}
        </div>
      </div>}
      footer={disable===2?<Button type="primary" onClick={()=>{
        submitRef.current.formRef.current.tableRef.current.submit();
      }}  >
        完成创建
      </Button>:false}
      width={width()}
      className={styles.myModal}
      onClose={()=>{
        setDisable(1);
        onClose();
      }}
    >
      {disable === 1 && data && data.length > 0 ? <BusinessTableIndex
        style={{backgroundColor: 'white', width: '100%'}}
        onChange={(reslut) => {
          setData(reslut);
          setDisable(2);
        }}
        data={data} /> : null}

      {disable === 2 && <BusinessSteps
        useData={useData}
        ref={submitRef}
        onChange={(result) => {
          if (result.success) {
            setDisable(3);
            setBusinessId(result.data);
          }
        }}
        onClose={() => {
          setData(null);
          typeof onClose === 'function' && onClose();
        }} />}
      {disable === 3 && <BusinessComplete
        result={businessId}
        onChange={(disable) => {
          setData(null);
          setDisable(disable);
        }}
        onClose={() => {
          setData(null);
          typeof onClose === 'function' && onClose();
        }} />}
    </Modal>
  );
};

export default React.forwardRef(BusinessAdd);
