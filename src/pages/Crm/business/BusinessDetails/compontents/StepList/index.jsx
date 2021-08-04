import React, {useState} from 'react';
import { Steps } from 'antd';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';

const { Step } = Steps;

const StepList = (props) => {


  const [current,setCurrent] = useState();

  const {loading, data, run} = useRequest({url: '/crmBusinessSalesProcess/list',
    method: 'POST',data:{salesId:props.salesId}});

  const step = data ? data.map((value,index)=>{
    return (
      <>
        <Step title={value.name} description={`盈率：${value.percentage}%`} />
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
