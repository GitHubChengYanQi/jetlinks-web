import {Button, Steps} from 'antd';
import React, {useRef, useState} from 'react';
import FormClient from '@/components/Form/client';
import * as SysField from '@/pages/DaoXinCustomer/client/clientField';
import ContactsList from '@/pages/DaoXinCustomer/client/clientEdit/client';
import AdressList from '@/pages/DaoXinCustomer/client/clientEdit/adress';

const {Step} = Steps;

const Step2 = ({
  props,
  ApiConfig,
  value,
}) => {


  const [result, setResult] = useState(props.value);

  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();

  const steps = [
    {
      title: '客户重要信息',
      content:
        <>
          <div style={{margin: '50px 0'}}>
            <FormClient
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="clientId"
              clientId={(result) => {
                if (result.data!==""){
                  setResult(result.data);
                }
                next();
              }}
            >

              {
                value
              }
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormClient>
          </div>
        </>
    },
    {
      title: '详细信息',
      content:
        <>

          <div style={{margin: '50px 0'}}>
            <FormClient
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="clientId"
              clientId={(result) => {
                next();
              }}
            >
              <FormItem label="成立时间" name="setup" component={SysField.Setup} />
              <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} />
              <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
              <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />
              <FormItem label="简介" name="introduction" component={SysField.Introduction} />
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormClient>
          </div>

        </>,
    },
    {
      title: '联系人信息',
      content:
        <>
          <div style={{margin: '50px 0'}}>

            <ContactsList clientId={props.value ? props.value : result} />
            <Button type="primary" onClick={()=>{next();}}>
              Next
            </Button>
          </div>
        </>
    },
    {
      title: '客户地址',
      content:
        <>
          <div style={{margin: '50px 0'}}>
            <AdressList clientId={props.value ? props.value : result} />
            <Button type="primary" onClick={() => {
              props.onSuccess();
            }}>
              Done
            </Button>
          </div>

        </>,
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

export default Step2;
