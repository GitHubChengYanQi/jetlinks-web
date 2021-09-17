/**
 * 联系人表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef, useState} from 'react';
import {Button, Col, Divider, Input, Row, Steps} from 'antd';
import Form from '@/components/Form';
import {contactsDetail, contactsAdd, contactsEdit} from '../contactsUrl';
import Title from '@/components/Title';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import styled from 'styled-components';
import * as SysField from '@/pages/Crm/contacts/ContactsField';

const {FormItem} = Form;

const ApiConfig = {
  view: contactsDetail,
  add: contactsAdd,
  save: contactsEdit
};


const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    width: 70%;
  }
`;


const ContactsEdit = ({...props}) => {

  const {customerId} = props;
  const formRef = useRef();
  const [result, setResult] = useState(props.value);
  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    return 500;
  };
  return (
    <>
      <div style={{height: height()}}>
        <Form
          {...props}
          value={result}
          ref={formRef}
          api={ApiConfig}
          fieldKey="contactsId"
          success={(data) => {
            if(data.data !== ''){
              setResult(data.data.contactsId);
            }
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <div style={{paddingRight: 10, height: height(), overflow: 'auto'}}>
                <ProCard style={{marginTop: 8}} title={<Title title="联系人信息" level={4} />} headerBordered>
                  <FormItem label="联系人姓名" name="contactsName" component={SysField.ContactsName}  required/>
                  <FormItem label="职务" name="companyRole" component={SysField.CompanyRole} required/>
                  <FormItem label="客户" name="customerId" component={SysField.CustomerId} customerId={customerId || null} required />
                </ProCard>
              </div>
            </Col>
            <Col span={12}>
              <div style={{height: height(), overflow: 'auto'}}>
                <ProCard style={{marginTop: 8}} title={<Title title="联系人电话" level={2} />} headerBordered>
                  <FieldList
                    name="phoneParams"
                    initialValue={[
                      {phoneNumber: ''},
                    ]}
                  >
                    {({state, mutators}) => {
                      const onAdd = () => mutators.push();
                      return (
                        <div>
                          {state.value.map((item, index) => {
                            const onRemove = index => mutators.remove(index);
                            return (
                              <div key={index}>
                                <RowStyleLayout key={index}>
                                  <FormItem
                                    label="电话号码"
                                    name={`phoneParams.${index}.phoneNumber`}
                                    component={SysField.PhoneNumber}
                                  />
                                  <Button
                                    type="link" style={{float: 'right'}}
                                    onClick={() => {
                                      onRemove(index);
                                    }}>删除电话</Button>
                                </RowStyleLayout>
                                <Divider dashed style={{margin: 0}} />
                              </div>
                            );
                          })}
                          <Button type="link" style={{float: 'right'}} onClick={onAdd}>增加电话号码</Button>
                        </div>
                      );
                    }}
                  </FieldList>
                </ProCard>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ContactsEdit;
