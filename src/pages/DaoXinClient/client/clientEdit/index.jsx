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
import {FormButtonGroup} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: clientDetail,
  add: clientAdd,
  save: clientEdit
};

const { Step } = Steps;










const ClientEdit = ({...props}) => {

  const [current, setCurrent] = React.useState(0);

  const formRef = useRef();

  const steps = [
    {
      title: '客户重要信息',
      content:
        <>
          <div style={{margin:'50px 0'}}>
            <FormClient
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="contactsId"
            >
              <FormItem label="客户名称" name="clientName" component={SysField.ClientName} required/>
              <FormItem label="法定代表人" name="legal" component={SysField.Legal} required/>
              <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} required/>

              <Button type="primary" htmlType="onSubmit" onClick={
                () => {
                  next();
                }}
              >
                下一项
              </Button>
            </FormClient>
          </div>
        </>
    },
    {
      title: '详细信息',
      content:
        <>
          <div style={{margin:'50px 0'}}>
            <FormClient
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="contactsId"
            >
              <FormItem label="客户地址id" name="adressId" component={SysField.AdressId} />
              <FormItem label="成立时间" name="setup" component={SysField.Setup} />
              <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} />
              <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
              <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />
              <FormItem label="简介" name="introduction" component={SysField.Introduction} />
              <Button type="primary" htmlType="submit" onClick={
                () => {
                  next();
                }}
              >
                下一项
              </Button>
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                上一项
              </Button>
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                完成
              </Button>
            </FormClient>
          </div>
        </>,
    },
    {
      title: '联系人信息',
      content:
        <>
          <div style={{margin:'50px 0'}}>

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

export default ClientEdit;
