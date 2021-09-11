import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Button, Col, Divider, Modal, Row, Statistic, Steps} from 'antd';

import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
const {Step} = Steps;
const BusinessAdd = (props, ref) => {

  const {onClose} = props;
  const stepsRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useData, setData] = useState([]);

  const {data, run: crmBusinessSalesRun} = useRequest({
    url: '/crmBusinessSales/list',
    method: 'POST',
    rowKey: 'salesId',
  });

  const open = () => {
    crmBusinessSalesRun();
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
    <>
      <Modal title="添加项目" visible={isModalVisible} onCancel={()=>{
        typeof onClose==='function' && onClose();
      }}>
        <p >商机流程：</p>
        <div style={{maxHeight:'100vh'}}>
          {data && data.length > 0 ? data.map((item, index) => {
            return (
              <div key={index} style={{borderBottom: 'solid #eee 1px', marginBottom: 20}}>
                <Button key={index} onClick={()=>{
                  setData(item);
                  stepsRef.current.open(item);
                }}>
                  {item.name}
                </Button>
              </div>
            );

          }) : null }
        </div>
        <BusinessSteps
          ref={stepsRef}
          useData={useData ? useData.process : []}
          onSuccess={() => {
            stepsRef.current.close();
          }}
          onClose={() => {
            stepsRef.current.close();
          }}
        />
        {/*<Modal2 width={800} title="流程" component={BusinessSteps} onSuccess={() => {*/}
        {/*  stepsRef.current.close();*/}
        {/*}} ref={stepsRef} />*/}
      </Modal>

    </>
  );
};

export default React.forwardRef(BusinessAdd);
