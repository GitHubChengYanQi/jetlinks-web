import React, { useImperativeHandle, useRef, useState} from 'react';
import { Modal} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
import BusinessTableIndex from '@/pages/Crm/business/BusinessAdd/components/businessTableIndex';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';

const BusinessAdd = (props, ref) => {

  const {onClose} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useData, setData] = useState([]);
  const [disable, setDisable] = useState(1);
  const [stage, setStage] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [widths, setWidth] = useState(400);


  const {data, run: crmBusinessSalesRun} = useRequest({
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
      <Modal title={<div style={disable === 2 ? null : {'display' : 'none'}}> <LeftOutlined onClick={()=>{setDisable(1); setWidth(400); setStage(null); setData(null);}} /> 添加项目</div>} visible={isModalVisible}
        footer={false}
        width={widths}
        onCancel={()=>{
          setStage(null);
          setData(null);
          typeof onClose==='function' && onClose();
        }}
      >
        <div style={disable === 1 ? {marginRight: 10, maxHeight:'100vh'} : {display: 'none'}}>
          {data && data.length > 0 ? <BusinessTableIndex
            onChange={(rtData)=>{
              setData(rtData.process);
              setStage(rtData.salesId);
              setDisable(2);
              setWidth(1000);
            }}
            data={data}/> : null}
        </div>
        <div style={disable === 2 ? null : {display: 'none', maxHeight:'100vh'}}>
          {stage && <BusinessSteps useData={useData} stage={stage}
            onChange={(result)=>{
              if(result.success){
                setDisable(3);
                setWidth(500);
                setBusinessId(result.data);
              }
            }}
            onClose={()=>{
              setStage(null); setData(null);
              typeof onClose==='function' && onClose();
            }}/>}
        </div>
        <div style={disable === 3 ? null : {display: 'none', maxHeight:'100vh'}}>
          {businessId && <BusinessComplete result={businessId}
            onChange={(disable)=>{
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
