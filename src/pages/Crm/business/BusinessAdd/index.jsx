import React, { useImperativeHandle, useRef, useState} from 'react';
import {Modal, Spin} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
import BusinessTableIndex from '@/pages/Crm/business/BusinessAdd/components/businessTableIndex';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';
import styles from './index.module.scss';
import { Loading} from '@alifd/next';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import CustomerDetail from '@/pages/Crm/business/BusinessDetails';

const BusinessAdd = (props, ref) => {

  const {onClose, showFlag} = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useData, setData] = useState([]);
  const [disable, setDisable] = useState(1);
  const [stage, setStage] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [widths, setWidth] = useState(400);
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [back, setBack] = useState(true);

  const { data, run: crmBusinessSalesRun} = useRequest({
    url: '/crmBusinessSales/list',
    method: 'POST',
    rowKey: 'salesId',
  });

  const open = () => {
    setShow(true);
    setShow1(true);
    // setShow2(true);
    setDisable(1);
    setBack(false);
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

  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    if(disable === 1){
      return 750;
    }else if(disable === 2){
      return 450;
    }else if(disable === 3){
      return 400;
    }
  };

  return (
    <>
      <div style={showFlag === false ? {'display':'none'} : {height: height()}}>
        <Modal title={<div ><div style={back ? {display:'inline'} : {'display' : 'none'}}>
          <LeftOutlined
            onClick={()=>{setDisable(disable > 1 ? disable -1 : 1);
              setWidth(400);
              setShow(true);
              setShow1(true);
              setStage(null);
              setData(null);}} /> </div><div style={{marginLeft: '40%', display:'inline'}}>添加项目</div> </div>    }
        visible={isModalVisible}
        footer={false}
        width={widths}
        className={styles.myModal}
        onCancel={()=>{
          setStage(null);
          setData(null);
          typeof onClose==='function' && onClose();
        }}
        >
          <div style={{height: height(), overflow: 'auto'}}>
            <div style={disable === 1 ? {marginRight: 10, animationDelay: '-1s'} : {display: 'none', animationDelay: '-1s'}}>
              {data && data.length > 0 ? <BusinessTableIndex style={{backgroundColor:'aliceblue',width: '100%'}}
                onChange={(rtData)=>{
                  setShow(false);
                  setData(rtData.process);
                  setStage(rtData.salesId);
                  setDisable(2);
                  setBack(true);
                  setWidth(1000);
                }}
                data={data}/> : null}
            </div>
            <div style={disable === 2 ? { animationDelay: '-1s',  width: '900px'} : {display: 'none',  maxWidth: '1000px', animationDelay: '-1s'}}>
              <Spin spinning={show} delay={500} style={{backgroundColor:'aliceblue',width: '100%'}}>
                <div style={disable === 2 ? {animationDelay: '-1s',  width: '900px'} : {display: 'none', maxWidth: '1000px%', animationDelay: '-1s'}}>
                  {stage && <BusinessSteps useData={useData} stage={stage}
                    onChange={(result)=>{
                      if(result.success){
                        setShow(false);
                        setShow1(false);
                        setDisable(3);
                        setBack(false);
                        setWidth(500);
                        setBusinessId(result.data);
                      }
                    }}
                    onClose={()=>{
                      setStage(null); setData(null);
                      typeof onClose==='function' && onClose();
                    }}/>}
                </div>
              </Spin>
            </div>
            <div style={disable === 3 ? {animationDelay: '-1s'} : {display: 'none', animationDelay: '-1s'}}>
              <Spin spinning={show1} delay={500} style={{backgroundColor:'aliceblue',width: '100%'}}>
                {businessId && <BusinessComplete result={businessId}
                  onChange={(disable)=>{
                    setStage(null); setData(null);
                    setDisable(disable);
                    if(disable === 1){
                      setBack(false);
                      setWidth(400);
                    }else{
                      setBack(true);
                      setWidth(800);
                      // setShow2(false);
                    }
                  }}
                  onClose={()=>{
                    setStage(null); setData(null);
                    typeof onClose==='function' && onClose();
                  }}/>}
              </Spin>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default React.forwardRef(BusinessAdd);
