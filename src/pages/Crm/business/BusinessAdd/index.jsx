import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Button, Modal} from 'antd';
import {useRequest} from '@/util/Request';
import BusinessSteps from '@/pages/Crm/business/BusinessAdd/components/businessSteps';
import CompetitorEdit from '@/pages/Crm/competitor/competitorEdit';
import Modal2 from '@/components/Modal';

const BusinessAdd = (props, ref) => {

  const {onClose} = props;
  const stepsRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [data, setDate] = useState([]);

  const {data, run: crmBusinessSalesRun} = useRequest({
    url: '/crmBusinessSales/list',
    method: 'POST',
    rowKey: 'salesId',
    // onSuccess: (reslut) => {
    //   console.log(2222222222222, reslut);
    //   setDate(reslut);
    // }
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
    <Modal title="添加项目" visible={isModalVisible} onCancel={()=>{
      typeof onClose==='function' && onClose();
    }}>
      <p >销售流程：</p>
      <div style={{maxHeight:'100vh'}}>
        {data && data.length > 0 ? data.map((item, index) => {
         // console.log(1111111111, item);
          return (
            <div key={index} style={{borderBottom: 'solid #eee 1px', marginBottom: 20}}>
              <Button key={index} onClick={()=>{
                console.log(11111111111111111, item);
                stepsRef.current.open(item);
              }}>
                {item.name}
              </Button>
              <Modal2 width={1000}  title="竞争对手" component={BusinessSteps} onSuccess={() => {
                ref.current.close();
              }} ref={stepsRef}
                // onChange={(res)=>{
                //   if(res){
                //     props.onChange(res && res.data && res.data.competitorId);
                //   }
                // }}
              />
            </div>
          );
        }) : null }
      </div>
    </Modal>
  );
};

export default React.forwardRef(BusinessAdd);
