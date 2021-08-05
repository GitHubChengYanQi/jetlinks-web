import React, {useState} from 'react';
import {Select, Steps} from 'antd';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';

const {Step} = Steps;

const StepList = (props) => {

  const {value, onChange: pOnChange} = props;
  const [current, setCurrent] = useState(2);


  const {data} = useRequest({
    url: '/crmBusinessSalesProcess/list',
    method: 'POST', data: {salesId: value.salesId}
  });

  const {run} = useRequest({
    url: '/crmBusiness/edit',
    method: 'POST',
    onError() {

    }
  }, {
    manual: true
  });

  const step = data ? data.map((values, index) => {
    return (
      <>
        <Step title={values.name} description={`盈率：${values.percentage}%`}
          onClick={async () => {
            await run(
              {
                data: {
                  processId: values.salesProcessId,
                  businessId: value.businessId
                }
              }
            );
            typeof pOnChange === 'function' && pOnChange();
          }}
        />
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
      <Step title={<Select options={[{label:111,value:222}]} />} />
    </Steps>
  );

};

export default StepList;
