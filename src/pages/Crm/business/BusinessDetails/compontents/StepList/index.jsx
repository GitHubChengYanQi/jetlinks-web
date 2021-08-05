import React, {useState} from 'react';
import {Menu, Popover, Select, Steps} from 'antd';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';

const {Step} = Steps;

const StepList = (props) => {

  const {value, onChange: pOnChange} = props;


  const [current, setCurrent] = useState(value.process ? value.process.sort : 0);


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

  const {run: addRun} = useRequest({
    url: '/crmBusinessTrack/add',
    method: 'POST',
    onError() {

    }
  }, {
    manual: true
  });

  const {run: runs} = useRequest({
    url: '/crmBusinessSalesProcess/edit',
    method: 'POST',
    onError() {

    }
  }, {
    manual: true
  });



  const step = data ? data.map((values, index) => {
    if (index === data.length - 1) {
      return (
        <>
          <Step title={
            <>
              <Popover placement="bottom" content={
                <div>
                  <a className={styles.state} onClick={async () => {
                    await run(
                      {
                        data: {
                          processId: values.salesProcessId,
                          businessId: value.businessId
                        }
                      }
                    );
                      await runs(
                        {
                          data: {
                            salesProcessId: values.salesProcessId,
                            percentage: 100,
                            name: '赢单'
                          }
                        }
                      );
                    await addRun(
                      {
                        data: {
                          note: `更改流程为${values.name}`,userId: value.person,businessId: value.businessId
                        }
                      }
                    );
                      typeof pOnChange === 'function' && pOnChange();
                  }}>赢单 100%</a>
                  <a className={styles.state} onClick={async () => {
                    await run(
                      {
                        data: {
                          processId: values.salesProcessId,
                          businessId: value.businessId
                        }
                      }
                    );
                    await runs(
                      {
                        data: {
                          salesProcessId: values.salesProcessId,
                          percentage: 0,
                          name: '输单'
                        }
                      }
                    );
                    await addRun(
                      {
                        data: {
                          note: `更改流程为${values.name}`,userId: value.person,businessId: value.businessId
                        }
                      }
                    );
                    typeof pOnChange === 'function' && pOnChange();
                  }}>输单 0%</a>
                </div>
              } trigger="hover">
                {values.name}
              </Popover>
          </>}

          />
        </>
      );
    } else {
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
                  await addRun(
                    {
                      data: {
                        note: `更改流程为${values.name}`,userId: value.person,businessId: value.businessId
                      }
                    }
                  );
                  typeof pOnChange === 'function' && pOnChange();
                }}
          />
        </>
      );
    }
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
