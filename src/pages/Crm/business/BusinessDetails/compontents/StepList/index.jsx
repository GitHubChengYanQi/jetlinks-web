import React, {useState} from 'react';
import { Steps } from 'antd';
import {useRequest} from '@/util/Request';
import {businessDetail} from '@/pages/Crm/business/BusinessUrl';

const { Step } = Steps;

const StepList = () => {

  const [current,setCurrent] = useState();

  const {loading, data, run} = useRequest(businessDetail);

  const onChange = (current) => {
    setCurrent(current);
  };

  return (
    <Steps
      type="navigation"
      current={current}
      onChange={onChange}
    >
      <Step title="Step 1" />
      <Step title="Step 2" />
      <Step title="Step 3" />
      <Step title="Step 4" />
    </Steps>
  );

};

export default StepList;
