import React, {useImperativeHandle, useRef, useState} from 'react';
import {Spin, Steps} from 'antd';
import AddContractEdit from '@/pages/Crm/contract/ContractEdit';

const {Step} = Steps;

const CreateContracts = ({data,onSuccess=()=>{}}, ref) => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const createRef = useRef();

  const next = () => {
    createRef.current.submit();
  };

  useImperativeHandle(ref, () => ({
    next,
  }));

  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div style={{padding: 16}}>
      <Steps current={current}>
        {
          data.map((item, index) => {
            return <Step key={index} title={`合同${index + 1}`} />;
          })
        }
      </Steps>
      <div className="steps-content">
        {loading ?
          <div style={{textAlign: 'center', padding: 16}}><Spin size="large" /></div>
          :
          <AddContractEdit
            ref={createRef}
            onSuccess={()=>{
              if (current === data.length - 1) {
                onSuccess();
              }
              setTimeout(() => {
                setLoading(false);
              }, 1000);
              setLoading(true);
              setCurrent(current + 1);
            }}
            enterpriseA
            supplyB={1}
            partyB={data[current].customerId}
            value={false}
            submitValue={{
              source:'采购单',
              sourceId:data[current].orderId
            }}
            defaultValue={{
              allMoney: data[current].money,
              contractDetailList: data[current].skus.map((item) => {
                return {
                  skuId: item.skuId,
                  brandId: item.brandId,
                  quantity: item.total,
                  salePrice: item.money / item.total,
                };
              })
            }}
          />}
      </div>
    </div>
  );
};

export default React.forwardRef(CreateContracts);
