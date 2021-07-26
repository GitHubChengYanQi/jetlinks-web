/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef, useState} from 'react';
import {Button, Input, message, Steps, Table} from 'antd';
import {clientDetail, clientAdd, clientEdit} from '../clientUrl';
import * as SysField from '@/pages/DaoXinClient/client/clientField';
import Form from '@/components/Form';
import FormClient from '@/components/Form/client';
import {FormButtonGroup, Reset, Submit} from '@formily/antd';
import ContactsList from '@/pages/DaoXinClient/client/clientEdit/client';
import AdressList from '@/pages/DaoXinClient/client/clientEdit/adress';

const {FormItem} = Form;

const ApiConfig = {
  view: clientDetail,
  add: clientAdd,
  save: clientEdit
};

const {Step} = Steps;


const ClientEdit = ({...props}) => {

  const [result,setResult] = useState();







  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();

  const steps = [
    {
      title: '客户重要信息',
      content:
        <>
          <div style={{margin: '50px 0'}}>

            <FormItem label="客户名称" name="clientName" component={SysField.ClientName} required />
            <FormItem label="法定代表人" name="legal" component={SysField.Legal} required />
            <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} required />


          </div>
        </>
    },
    {
      title: '详细信息',
      content:
        <>
          <div style={{margin: '50px 0'}}>
            <FormItem label="成立时间" name="setup" component={SysField.Setup} />
            <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} />
            <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
            <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />
            <FormItem label="简介" name="introduction" component={SysField.Introduction} />
            <Submit showLoading>保存</Submit>
          </div>
        </>,
    },
    {
      title: '联系人信息',
      content:
        <>
          <div style={{margin: '50px 0'}}>
           <ContactsList clientId={ props.value ? props.value : result } />
          </div>
        </>
    },
    {
      title: '客户地址',
      content:
        <>
          <div style={{margin: '50px 0'}}>
           <AdressList clientId={props.value ? props.value : result} />
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
      <FormClient
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="clientId"
        aa={(result)=>{
          setResult(result.data);}}
      >


        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </FormClient>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" htmlType="submit" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{margin: '0 8px'}} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default ClientEdit;
