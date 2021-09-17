/**
 * 联系人表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef, useState} from 'react';
import {Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import {contactsDetail, contactsAdd, contactsEdit} from '../contactsUrl';
import PhoneList from '@/pages/Crm/phone/phoneList';
import * as SysField from '../ContactsField';

const {FormItem} = Form;

const ApiConfig = {
  view: contactsDetail,
  add: contactsAdd,
  save: contactsEdit
};

const ContactsEdit = ({...props}) => {

  const {customerId} = props;

  const {Step} = Steps;
  const formRef = useRef();
  const [result, setResult] = useState(props.value);
  const [current, setCurrent] = React.useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);

  };

  const steps = [
    {
      title: '联系人信息',
      content:
        <>
          <Form
            {...props}
            value={result}
            ref={formRef}
            NoButton={false}
            api={ApiConfig}
            fieldKey="contactsId"
            onSuccess={(data) => {
              if(data.data !== ''){
                setResult(data.data.contactsId);
              }
              next();
            }}
          >
            <FormItem label="联系人姓名" name="contactsName" component={SysField.ContactsName}  required/>
            <FormItem label="职务" name="companyRole" component={SysField.CompanyRole} required/>
            <FormItem label="客户" name="customerId" component={SysField.CustomerId} customerId={customerId || null} required />
            <div style={{textAlign:'center'}}>
              <Button type="primary" htmlType="submit">
                下一步
              </Button>
            </div>
          </Form>
        </>
    },
    {
      title: '联系人电话',
      content:
        <>
          <div style={{padding: '10px 50px'}}>
            <PhoneList value={props.value || result} />
            <div style={{textAlign:'center'}}>
              <Button type="primary" onClick={()=>{
                props.onSuccess();
              }
              }>
                保存
              </Button>
              <Button onClick={()=> prev()}>
                返回
              </Button>
            </div>
          </div>
        </>
    },
  ];

  return (
    <>
      <Steps current={current} style={{padding: '10px 50px '}}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </>
  );
};

export default ContactsEdit;
