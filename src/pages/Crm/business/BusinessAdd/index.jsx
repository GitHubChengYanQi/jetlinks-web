import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Button, Modal} from 'antd';
import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';

const BusinessAdd = (props, ref) => {

  const {onClose} = props;
  const stepsRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [datas, setData] = useState([]);

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
                  console.log(11111111111111111, item);
                  setData(item);
                  stepsRef.current.open(false);
                }}>
                  {item.name}
                </Button>

              </div>
            );
          }) : null }
        </div>

      </Modal>
      <BusinessSteps
        ref={stepsRef}
        value={datas.length > 0 ? datas : null}
        onSuccess={() => {
          stepsRef.current.close();
        }}
        onClose={() => {
          stepsRef.current.close();
        }}
      />
    </>

  );
};

export default React.forwardRef(BusinessAdd);
