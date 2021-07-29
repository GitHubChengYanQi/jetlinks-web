/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef, useState} from 'react';
import {Button, Input, message, Steps, Table} from 'antd';
import Form from '@/components/Form';
import {
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import ContactsList from '@/pages/Crm/customer/CustomerEdit/components/ContactsList';
import AdressList from '@/pages/Crm/customer/CustomerEdit/components/AdressList';
import FormIndex from '@/components/Form/FormIndex';

const {FormItem} = Form;

const ApiConfig = {
  view: customerDetail,
  add: customerAdd,
  save: customerEdit
};

const {Step} = Steps;


const CustomerEdit = ({...props}) => {

  const [result, setResult] = useState(props.value);

  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();

  const steps = [
    {
      title: '客户重要信息',
      content:
        <>
          <div style={{margin: '50px 0'}}>

            <FormIndex
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="customerId"
              success={(result) => {
                if (result.data !== '') {
                  setResult(result.data);
                }
                next();
              }}
            >
              <FormItem label="客户名称" name="customerName" component={SysField.ClientName} required />
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>
        </>
    },
    {
      title: '详细信息',
      content:
        <>

          <div style={{margin: '50px 0'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="customerId"
              success={(result) => {
                next();
              }}
            >
              <FormItem label="法定代表人" name="legal" component={SysField.Legal}  />
              <FormItem label="公司类型" name="companyType" component={SysField.CompanyType}  />
              <FormItem label="成立时间" name="setup" component={SysField.Setup} />
              <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} />
              <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
              <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />
              <FormItem label="简介" name="introduction" component={SysField.Introduction} />
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </FormIndex>
          </div>

        </>,
    },
    {
      title: '联系人信息',
      content:
        <>
          <div style={{margin: '50px 0'}}>
            <ContactsList clientId={props.value ? props.value : result} />
            <Button type="primary" onClick={() => {
              next();
            }}>
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

export default CustomerEdit;
