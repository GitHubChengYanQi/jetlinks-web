/**
 * 联系人表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Button, Col, Divider, Input, Row, Steps} from 'antd';

import {createFormActions, InternalFieldList as FieldList} from '@formily/antd';
import styled from 'styled-components';
import ProCard from '@ant-design/pro-card';
import Title from '@/components/Title';
import * as SysField from '@/pages/Crm/contacts/ContactsField';
import {contactsDetail, contactsAdd, contactsEdit} from '../contactsUrl';
import Form from '@/components/Form';
import {CustomerId, SelectCustomers} from '@/pages/Crm/contacts/ContactsField';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';

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

const ContactsEdit = ({...props}, ref) => {

  const {customerId} = props;
  const formRef = useRef(null);
  const [result, setResult] = useState(props.value);
  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    return 500;
  };
  useImperativeHandle(ref, () => ({
    formRef,
  }));
  return (
    <>
      <div style={{height: height(), padding: '0px 20px'}}>
        <Form
          {...props}
          NoButton={false}
          value={result}
          ref={formRef}
          api={ApiConfig}
          fieldKey="contactsId"
          onSuccess={(data) => {
            if (data.data !== '') {
              setResult(data.data.contactsId);
            }
            props.onSuccess(data && data.data && data.data.contactsId);
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <div style={{paddingRight: 10, height: height(), overflow: 'auto'}}>
                <ProCard className="h2Card" style={{marginTop: 8}} title={<Title title="联系人信息" level={4} />} headerBordered>
                  <FormItem label="联系人姓名" name="contactsName" component={SysField.ContactsName} required />
                  <FormItem label="职务" name="companyRole" component={SysField.CompanyRole} required />
                  {customerId ?
                    <FormItem
                      label="客户"
                      name="customerId"
                      component={SysField.CustomerId}
                      customer={customerId || null} required />
                    :
                    <FormItem
                      label="客户"
                      name="customerId"
                      component={SysField.SelectCustomers}
                      customer={customerId || null} required />}
                </ProCard>
              </div>
            </Col>
            <Col span={12}>
              <div style={{height: height(), overflow: 'auto'}}>
                <ProCard className="h2Card" style={{marginTop: 8}} title={<Title title="联系人电话" level={4} />} headerBordered>
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
                                    type="link"
                                    style={{float: 'right',display: state.value.length === 1 && 'none'}}
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={() => {
                                      onRemove(index);
                                    }} />
                                </RowStyleLayout>
                                <Divider dashed style={{margin: 0}} />
                              </div>
                            );
                          })}
                          {/*<Button type="link" style={{float: 'right'}} onClick={onAdd}>增加电话号码</Button>*/}
                          <Button
                            type="dashed"
                            icon={<PlusOutlined />}
                            style={{width: '100%'}}
                            onClick={onAdd}>增加电话</Button>
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

export default forwardRef(ContactsEdit);
