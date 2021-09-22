/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Button, Collapse, Divider, Row, Col} from 'antd';
import {
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import ProCard from '@ant-design/pro-card';
import {useHistory} from 'ice';
import {MegaLayout} from '@formily/antd-components';
import {InternalFieldList as FieldList, Reset, Submit} from '@formily/antd';
import styled from 'styled-components';
import Form from '@/components/Form';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import style from './index.module.scss';
import Title from '@/components/Title';

const {FormItem} = Form;


const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    //margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    margin-right: 10px;
    width: 43%;
  }
`;
const PhoneRowStyleLayout = styled(props => <div {...props} />)`
  width: 61%;
  display: inline-block;

  .ant-btn {
  }

  .ant-form-item {
    display: inline-flex;
    width: 80%
  }
`;
const AdressRowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    //margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    //margin-right: 16px;
    width: 100%;
  }
`;


const ApiConfig = {
  view: customerDetail,
  add: customerAdd,
  save: customerEdit
};


const CustomerEdit = ({onChange, ...props}, ref) => {


  const formRef = useRef();

  const history = useHistory();

  useImperativeHandle(ref, () => ({
    formRef,
  }));


  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    return 930;
  };

  return (
    <div className={style.from} style={{height: height(), padding: '0 24px'}}>
      <Form
        {...props}
        labelAlign="left"
        ref={formRef}
        NoButton={false}
        api={ApiConfig}
        labelCol={null}
        wrapperCol={24}
        fieldKey="customerId"
        onSuccess={(res) => {
          if (res) {
            typeof onChange === 'function' && onChange(res);
          }
          props.onSuccess();
        }}
      >
        <Row gutter={24} style={{height: '100%'}}>
          <Col span={12} style={{height: '100%'}}>
            <div style={{height: '100%', overflow: 'auto'}}>
              <ProCard style={{marginTop: 24}} className="h2Card" title="基本信息" headerBordered>
                <MegaLayout labelWidth={100}>
                  <FormItem
                    label="客户名称" name="customerName" component={SysField.CustomerName}
                    method={props.value}
                    onSuccess={(customer) => {
                      history.push(`/CRM/customer/${customer && customer.customerId}`);
                    }} required />
                </MegaLayout>
                <MegaLayout labelWidth={100} grid>
                  <FormItem label="客户状态" name="status" component={SysField.Status} />
                  <FormItem label="客户分类" name="classification" component={SysField.Classification} />
                </MegaLayout>
                <MegaLayout labelWidth={100} grid>
                  <FormItem label="负责人" name="userId" component={SysField.UserName} />
                  <FormItem label="客户级别" name="customerLevelId" component={SysField.CustomerLevelId} />
                </MegaLayout>


              </ProCard>

              <ProCard
                title="详细信息"
                className="h2Card"
                headerBordered
              >


                <MegaLayout labelWidth={100} grid>
                  <FormItem label="法定代表人" name="legal" component={SysField.Legal} />
                  <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label="成立时间" name="setup" component={SysField.Setup} />
                  <FormItem label='社会信用代码'  name="utscc" component={SysField.Utscc} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
                  <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label="客户来源" name="originId" component={SysField.OriginId} />
                  <FormItem label="邮箱" name="emall" component={SysField.Emall} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label="网址" name="url" component={SysField.Url} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label="行业" name="industryId" component={SysField.IndustryOne} />
                </MegaLayout>

                <MegaLayout labelWidth={100}>
                  <FormItem label="简介" name="introduction" component={SysField.Introduction} />
                </MegaLayout>

                <MegaLayout labelWidth={100}>
                  <FormItem label="备注" name="note" component={SysField.Note} />
                </MegaLayout>
              </ProCard>

            </div>
          </Col>
          <Col span={12} style={{height: '100%'}}>
            <div style={{height: '100%', overflow: 'auto'}}>
              <ProCard style={{marginTop: 24}} title="联系人信息" className="h2Card" headerBordered>
                <FieldList
                  name="contactsParams"
                  initialValue={[
                    {contactsName: '', companyRole: ''},
                  ]}
                >
                  {({state, mutators}) => {
                    const onAdd = () => mutators.push();
                    return (
                      <div>
                        {state.value.map((item, index) => {
                          const onRemove = index => mutators.remove(index);
                          return (
                            <ProCard
                              headStyle={{borderLeft: 'none', padding: '8px 16px'}}
                              title={<Title title="联系人明细" level={6} />}
                              headerBordered
                              extra={
                                <Button
                                  type="link"
                                  style={{float: 'right',display: state.value.length === 1 && 'none'}}
                                  icon={<DeleteOutlined />}
                                  onClick={() => {
                                    onRemove(index);
                                  }}
                                  danger
                                />}
                              key={index}>
                              <RowStyleLayout key={index}>
                                <div>
                                  <FormItem
                                    label="联系人姓名"
                                    name={`contactsParams.${index}.contactsName`}
                                    component={SysField.ContactsName}
                                  />
                                  <FormItem
                                    label="职务"
                                    name={`contactsParams.${index}.companyRole`}
                                    component={SysField.CompanyRoleId}

                                  />
                                  {/* <ProCard style={{marginTop: 8}} headerBordered> */}
                                  <div style={{width: '88%', display: 'inline-block'}}>
                                    <FieldList
                                      name={`contactsParams.${index}.phoneParams`}
                                      initialValue={[
                                        {phoneNumber: ''},
                                      ]}
                                    >
                                      {({state, mutators}) => {
                                        const onAdd = () => mutators.push();
                                        return (
                                          <div>
                                            {state.value.map((item, indexs) => {
                                              const onRemove = index => mutators.remove(index);
                                              return (
                                                <PhoneRowStyleLayout key={indexs}>
                                                  <FormItem
                                                    label="联系人电话"
                                                    name={`contactsParams.${index}.phoneParams.${indexs}.phoneNumber`}
                                                    component={SysField.PhoneNumber}
                                                    rules={[{
                                                      message: '请输入正确的手机号码!',
                                                      pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
                                                    }]}
                                                  />
                                                  <Button
                                                    type="link"
                                                    title="删除电话"
                                                    style={{visibility: state.value.length === 1 && 'hidden'}}
                                                    icon={<DeleteOutlined />}
                                                    danger
                                                    onClick={() => onRemove(indexs)} />
                                                </PhoneRowStyleLayout>
                                              );
                                            })}
                                            <div style={{display: 'inline-block', height: 30}}>
                                              <Button
                                                type="dashed"
                                                title="增加电话"
                                                icon={<PlusOutlined />}
                                                onClick={onAdd} />
                                            </div>
                                          </div>
                                        );
                                      }}
                                    </FieldList>
                                  </div>
                                </div>
                                <Divider style={{margin:'8px 0'}} />
                              </RowStyleLayout>
                            </ProCard>
                          );
                        })}
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          style={{width: '100%'}}
                          onClick={onAdd}>增加联系人</Button>
                      </div>
                    );
                  }}
                </FieldList>
              </ProCard>

              <ProCard style={{marginTop: 8}} title="客户地址" className="h2Card" headerBordered>
                <FieldList
                  name="adressParams"
                  initialValue={[
                    {location: ''},
                  ]}
                >
                  {({state, mutators}) => {
                    const onAdd = () => mutators.push();
                    return (
                      <div>
                        {state.value.map((item, index) => {
                          const onRemove = index => mutators.remove(index);
                          return (
                            <ProCard
                              headStyle={{borderLeft: 'none', padding: '8px 16px'}}
                              title={<Title title="地址明细" level={6} />}
                              headerBordered
                              extra={
                                <Button
                                  type="link"
                                  style={{float: 'right',display: state.value.length === 1 && 'none'}}
                                  icon={<DeleteOutlined />}
                                  onClick={() => {
                                    onRemove(index);
                                  }}
                                  danger
                                />}
                              key={index}>
                              <FormItem
                                label="省市区地址"
                                name={`adressParams.${index}.region`}
                                component={SysField.Region}
                              />
                              <AdressRowStyleLayout key={index}>
                                <FormItem
                                  label="&nbsp;&nbsp;&nbsp;&nbsp;详细地址"
                                  name={`adressParams.${index}.map`}
                                  component={SysField.Map}
                                />
                              </AdressRowStyleLayout>
                              <Divider style={{margin: '8px 0'}} />
                            </ProCard>
                          );
                        })}
                        <Button
                          type="dashed"
                          style={{width: '100%'}}
                          icon={<PlusOutlined />}
                          onClick={onAdd}>增加客户地址</Button>
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
  );
};

export default forwardRef(CustomerEdit);
