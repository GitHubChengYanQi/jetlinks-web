import React, {useState} from 'react';
import { Steps } from 'antd';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';

const { Step } = Steps;

const StepList = (props) => {

  const {value,res} = props;
  const [current,setCurrent] = useState();



  const {data} = useRequest({url: '/crmBusinessSalesProcess/list',
    method: 'POST',data:{salesId:value.salesId}});

  const {run} = useRequest({url: '/crmBusinessTrack/add', method: 'POST'},{manual:true} );

  const step = data ? data.map((values,index)=>{
    return (
      <>
        <Step title={values.name} description={`盈率：${values.percentage}%`} onClick={()=>{
          // run({
          //   data:{note: `更改流程为${values.name}`,userId: value.person,businessId: value.businessId}}
          // );
          res();
        }} />
      </>
    );
  }) : null;

  const onChange = (current) => {
    setCurrent(current);
  };

  return (
    <Steps
      type="navigation"
      current={current}
      onChange={onChange}
    >
      {step}
    </Steps>
  );

};

export default StepList;
