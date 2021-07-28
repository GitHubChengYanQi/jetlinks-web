/**
 * 商机表编辑页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef, useState} from 'react';
import {Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import {businessDetail, businessAdd, businessEdit} from '../businessUrl';
import * as SysField from '../businessField';
import {Stock} from '../businessField';
import FormIndex from '@/components/Form/client';

const {FormItem} = Form;

const ApiConfig = {
  view: businessDetail,
  add: businessAdd,
  save: businessEdit
};

const BusinessEdit = ({...props}) => {


  const {Step} = Steps;

  const [result, setResult] = useState(props.value);
  console.log(result);

  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();

  const steps = [
    {
      title: '必填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="businessId"
              success={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="客户编号" name="customerId" component={SysField.Client} required/>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>
        </>
    },
    {
      title: '选填项',
      content:
        <>

          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="businessId"
              success={(result) => {
                next();
              }}
            >
              <FormItem label="物品编号" name="stockId" component={SysField.Stock} />
              <FormItem label="机会来源" name="originId" component={SysField.Source} />
              <FormItem label="立项日期" name="time" component={SysField.Time} />
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>

        </>
    },
    {
      title: '选填项',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="businessId"
              success={(result) => {
                props.onSuccess();
              }}
            >
              <FormItem label="商机状态" name="state" component={SysField.State} />
              <FormItem label="商机阶段" name="stage" component={SysField.Stage} />
              <FormItem label="负责人" name="person" component={SysField.Person} />
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </FormIndex>
          </div>

        </>
    },
  ];


  const next = () => {
    setCurrent(current + 1);
  };


  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>


      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>

    </>
  );



};

export default BusinessEdit;
