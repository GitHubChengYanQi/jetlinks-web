import React, {useImperativeHandle, useRef, useState} from 'react';
import {Spin} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
import BusinessTableIndex from '@/pages/Crm/business/BusinessAdd/components/businessTableIndex';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';
import Modal from '@/components/Modal';
import styles from './index.module.scss';

const BusinessAdd = (props, ref) => {

  const {onClose, showFlag} = props;

  const modalRef = useRef(null);

  const [ ,setIsModalVisible] = useState(false);
  const [useData, setData] = useState([]);
  const [disable, setDisable] = useState(1);
  const [stage, setStage] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [, setWidth] = useState(400);
  const [, setShow] = useState(true);
  const [, setShow1] = useState(true);
  const [, setBack] = useState(true);

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

  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    if (disable === 1) {
      return 750;
    } else if (disable === 2) {
      return 450;
    } else if (disable === 3) {
      return 400;
    }
  };

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

  console.log(width());

  return (
    <Modal
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
      footer={false}
      width={width()}
      className={styles.myModal}
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
        onChange={(result) => {
          if (result.success) {
            setDisable(3);
            setBusinessId(result.data);
          }
        }}
        onClose={() => {
          setStage(null);
          setData(null);
          typeof onClose === 'function' && onClose();
        }} />}
      {businessId && <BusinessComplete
        result={businessId}
        onChange={(disable) => {
          setStage(null);
          setData(null);
          setDisable(disable);
          if (disable === 1) {
            setBack(false);
            setWidth(400);
          } else {
            setBack(true);
            setWidth(800);
            // setShow2(false);
          }
        }}
        onClose={() => {
          setStage(null);
          setData(null);
          typeof onClose === 'function' && onClose();
        }} />}
    </Modal>
  );
};

export default React.forwardRef(BusinessAdd);
