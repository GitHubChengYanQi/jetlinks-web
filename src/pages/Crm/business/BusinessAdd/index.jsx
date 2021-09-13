import React, { useImperativeHandle, useRef, useState} from 'react';
import { Modal} from 'antd';
import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
import BusinessTableIndex from '@/pages/Crm/business/BusinessAdd/components/businessTableIndex';
import AppEntFUNC from '@/asseset/imgs/88.png';
import {LeftOutlined} from '@ant-design/icons';

const BusinessAdd = (props, ref) => {

  const {onClose} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useData, setData] = useState([]);
  const [disable, setDisable] = useState(true);

  const {data, run: crmBusinessSalesRun} = useRequest({
    url: '/crmBusinessSales/list',
    method: 'POST',
    rowKey: 'salesId',
  });

  const open = () => {
    setDisable(true);
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

  const changeSteps = (rtData) =>{
    return <BusinessSteps useData={rtData} />;
  };

  return (
    <>
      <Modal title={<div> <LeftOutlined onClick={()=>(setDisable(true))} /> 添加项目</div>} visible={isModalVisible}
        footer={false}
        width={disable ? 400 : 1800}
        onCancel={()=>{
          typeof onClose==='function' && onClose();
        }}>
        <div style={{}}>
          <div style={disable ? null : {display: 'none', maxHeight:'100vh'}}>
            {data && data.length > 0 ? <BusinessTableIndex
              onChange={(rtData)=>{
                setData(rtData);
                setDisable(false);
              }}

              data={data}/> : null}
          </div>
          <div style={disable ? {display: 'none', maxHeight:'100vh', width: 2000} : null}>
            {useData && changeSteps(useData.process)}
          </div>
        </div>
      </Modal>

    </>
  );
};

export default React.forwardRef(BusinessAdd);
