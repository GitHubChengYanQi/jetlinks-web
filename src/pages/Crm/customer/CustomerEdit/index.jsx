/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {forwardRef,  useImperativeHandle, useRef, useState} from 'react';
import {Button,  Collapse, Divider, Row, Col} from 'antd';
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

const {FormItem} = Form;

const {Panel} = Collapse;

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    //width: 42%;
  }
`;
const PhoneRowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    //width: 42%;
  }
`;
const AdressRowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    width: 80%;
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
    <div style={{height: height()}}>
      <Form
        {...props}
        labelAlign="left"
        ref={formRef}
        NoButton={false}
        api={ApiConfig}
        labelCol={null}
        wrapperCol={24}
        fieldKey="customerId"
        res={(res) => {
          if (res) {
            onChange(res);
          }
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <div style={{paddingRight: 20, height: height(), overflow: 'auto'}}>

              <ProCard style={{marginTop: 8}} title="基本信息" headerBordered>
                <MegaLayout labelWidth={120}>
                  <FormItem
                    label="客户名称" name="customerName" component={SysField.CustomerName}
                    method={props.value}
                    onSuccess={(customerId) => {
                      props.onSuccess();
                      history.push(`/CRM/customer/${customerId.customerId}`);
                    }} required />

                </MegaLayout>
                <MegaLayout labelWidth={120} grid>
                  <FormItem label="客户状态" name="status" component={SysField.Status} />
                  <FormItem label="客户分类" name="classification" component={SysField.Classification} />
                </MegaLayout>
                <MegaLayout labelWidth={120} grid>
                  <FormItem label="负责人" name="userId" component={SysField.UserName} />
                </MegaLayout>


              </ProCard>

              <ProCard
                title="详细信息"
                headerBordered
              >


                <MegaLayout labelWidth={120} grid>
                  <FormItem label="法定代表人" name="legal" component={SysField.Legal} />
                  <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} />
                </MegaLayout>

                <MegaLayout labelWidth={120} grid>
                  <FormItem label="成立时间" name="setup" component={SysField.Setup} />
                  <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} />
                </MegaLayout>

                <MegaLayout labelWidth={120} grid>
                  <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
                  <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />
                </MegaLayout>

                <MegaLayout labelWidth={120} grid>
                  <FormItem label="网址" name="url" component={SysField.Url} />
                  <FormItem label="客户级别" name="customerLevelId" component={SysField.CustomerLevelId} />
                </MegaLayout>

                <MegaLayout labelWidth={120} grid>
                  <FormItem label="客户来源" name="originId" component={SysField.OriginId} />
                  <FormItem label="邮箱" name="emall" component={SysField.Emall} />
                </MegaLayout>


                <MegaLayout labelWidth={120} grid>
                  <FormItem label="行业" name="industryId" component={SysField.IndustryOne} />
                </MegaLayout>

                <MegaLayout labelWidth={120}>
                  <FormItem label="简介" name="introduction" component={SysField.Introduction} />
                </MegaLayout>

                <MegaLayout labelWidth={120}>
                  <FormItem label="备注" name="note" component={SysField.Note} />
                </MegaLayout>
              </ProCard>

            </div>
          </Col>
          <Col span={12}>
            <div style={{height: height(), overflow: 'auto'}}>
              <ProCard style={{marginTop: 8}} title="联系人信息" headerBordered>
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
                                <div style={{float: 'right'}}>
                                  <Button type="link" onClick={() => onRemove(index)}>删除联系人</Button>
                                </div>
                                {/* <ProCard style={{marginTop: 8}} headerBordered> */}
                                <div style={{width: '75%', display: 'inline-block'}}>
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

                                                />
                                                <Button type="link" onClick={() => onRemove(indexs)}>删除电话</Button>
                                              </PhoneRowStyleLayout>
                                            );
                                          })}
                                          <div>
                                            <div style={{height: 30}}>
                                              <Button
                                                type="link"
                                                style={{float: 'right'}}
                                                onClick={onAdd}>增加联系人电话</Button>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </FieldList>
                                </div>
                              </div>
                              <Divider dashed />
                            </RowStyleLayout>
                          );
                        })}
                        <div style={{float: 'right'}}>
                          <Button type="link" onClick={onAdd}>增加联系人</Button>
                        </div>
                      </div>
                    );
                  }}
                </FieldList>
              </ProCard>

              <ProCard style={{marginTop: 8}} title="客户地址" headerBordered>
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
                            <div key={index}>
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
                                <Button
                                  type="link" style={{float: 'right'}}
                                  onClick={() => {
                                    onRemove(index);
                                  }}>删除地址</Button>
                              </AdressRowStyleLayout>
                              <Divider dashed />
                            </div>
                          );
                        })}
                        <Button type="link" style={{float: 'right'}} onClick={onAdd}>增加客户地址</Button>
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
