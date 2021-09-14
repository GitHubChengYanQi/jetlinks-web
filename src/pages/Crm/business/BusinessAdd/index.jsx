import React, { useImperativeHandle, useRef, useState} from 'react';
import {Modal, Spin} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
import BusinessTableIndex from '@/pages/Crm/business/BusinessAdd/components/businessTableIndex';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';
import styles from './index.module.scss';
import { Loading} from '@alifd/next';

const BusinessAdd = (props, ref) => {

  const {onClose} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useData, setData] = useState([]);
  const [disable, setDisable] = useState(1);
  const [stage, setStage] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [widths, setWidth] = useState(400);
  const [show, setShow] = useState(true);


  const { data, run: crmBusinessSalesRun} = useRequest({
    url: '/crmBusinessSales/list',
    method: 'POST',
    rowKey: 'salesId',
  });

  const open = () => {
    setDisable(1);
    setWidth(400);
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
      <Modal title={<div style={disable === 2 ? null : {'display' : 'none'}}> <LeftOutlined onClick={()=>{setDisable(1); setWidth(400);  setShow(true); setStage(null); setData(null);}} /> 添加项目</div>} visible={isModalVisible}
        footer={false}
        width={widths}
        className={disable === 3 ?  null : styles.myModal}
        onCancel={()=>{
          setStage(null);
          setData(null);
          typeof onClose==='function' && onClose();
        }}
      >
        <div style={disable === 1 ? {marginRight: 10, maxHeight:'400px', animationDelay: '-1s'} : {display: 'none', animationDelay: '-1s'}}>
          {data && data.length > 0 ? <BusinessTableIndex
            onChange={(rtData)=>{
              setShow(false);
              setData(rtData.process);
              setStage(rtData.salesId);
              setDisable(2);
              setWidth(1000);
            }}
            data={data}/> : null}
        </div>
        <div style={disable === 2 ? {animationDelay: '-5s',  maxHeight:'400px'} : {display: 'none', maxHeight:'400px', animationDelay: '-1s'}}>
          <Spin spinning={show} delay={500} style={{backgroundColor:'aliceblue',width: '100%'}}>
            {stage && <BusinessSteps useData={useData} stage={stage}
              onChange={(result)=>{
                if(result.success){
                  setShow(true);
                  setDisable(3);
                  setWidth(500);
                  setBusinessId(result.data);
                }
              }}
              onClose={()=>{
                setStage(null); setData(null);
                typeof onClose==='function' && onClose();
              }}/>}
          </Spin>
        </div>
        <div style={disable === 3 ? null : {display: 'none', maxHeight:'500px'}}>
          {businessId && <BusinessComplete result={businessId}
            onChange={(disable)=>{
              setShow(false);
              setStage(null); setData(null);
              setDisable(disable);
              setWidth(400);
            }}
            onClose={()=>{
              setStage(null); setData(null);
              typeof onClose==='function' && onClose();
            }}/>}
        </div>
      </Modal>

    </>
  );
};

export default React.forwardRef(BusinessAdd);
