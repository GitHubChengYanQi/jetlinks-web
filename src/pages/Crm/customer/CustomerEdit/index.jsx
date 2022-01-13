/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Button, Collapse, Divider, Row, Col} from 'antd';
import {
  commonArea,
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import ProCard from '@ant-design/pro-card';
import {useHistory} from 'ice';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, InternalFieldList as FieldList, Reset, Submit} from '@formily/antd';
import styled from 'styled-components';
import Form from '@/components/Form';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import Title from '@/components/Title';

import style from './index.module.scss';
import {useRequest} from '@/util/Request';

const {FormItem} = Form;
const formActions = createFormActions();

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

  const {wxUser, supply, ...other} = props;

  const city = wxUser && wxUser.openUserInfo && wxUser.openUserInfo.rawUserInfo && (JSON.parse(wxUser.openUserInfo.rawUserInfo).city || JSON.parse(wxUser.openUserInfo.rawUserInfo).province || JSON.parse(wxUser.openUserInfo.rawUserInfo).country);

  const {loading, data} = useRequest({
    url: '/commonArea/list',
    method: 'POST',
    data: {title: city}
  }, {manual: !props.wxUser});


  const formRef = useRef();

  const history = useHistory();

  useImperativeHandle(ref, () => ({
    formRef,
  }));

  if (wxUser && loading) {
    return null;
  }

  return (
    <div className={style.from} style={{maxHeight: 920, height: 'calc(100vh - 110px)', padding: '0 24px'}}>
      <Form
        {...other}
        labelAlign="left"
        ref={formRef}
        NoButton={false}
        api={ApiConfig}
        labelCol={null}
        wrapperCol={24}
        fieldKey="customerId"
        onSubmit={(value)=>{
          return {...value,supply};
        }}
        onSuccess={(res) => {
          if (res && typeof onChange === 'function') {
            onChange(res);
          }
          props.onSuccess();
        }}
        formActions={formActions}
      >
        <Row gutter={24} style={{height: '100%'}}>
          <Col span={props.value ? 24 : 12} style={{height: '100%'}}>
            <div style={{height: '100%', overflow: 'auto'}}>
              <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="基本信息" headerBordered>
                <MegaLayout labelWidth={100}>
                  <FormItem
                    label={supply ? '供应商名称' : '客户名称'} name="customerName" component={SysField.CustomerName}
                    supply={supply}
                    onSuccess={(customerId) => {
                      history.push(`${supply === 1 ? '/purchase/supply/' : '/CRM/customer/'}${customerId}`);
                    }} required />
                </MegaLayout>
                {supply === 0 && <MegaLayout labelWidth={100} grid>
                  <FormItem label="客户状态" name="status" component={SysField.Status} />
                  <FormItem label="客户分类" name="classification" component={SysField.Classification} />
                </MegaLayout>}
                <MegaLayout labelWidth={100} grid>
                  <FormItem label="负责人" name="userId" component={SysField.UserName} />
                  <FormItem label={supply ? '供应商级别' : '客户级别'} name="customerLevelId" component={SysField.CustomerLevelId} />
                </MegaLayout>
              </ProCard>

              <ProCard
                title="详细信息"
                className="h2Card"
                headerBordered
                bodyStyle={{padding: 16}}
              >
                <MegaLayout labelWidth={100} grid>
                  <FormItem label="法定代表人" name="legal" component={SysField.Legal} />
                  <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label="成立时间" name="setup" component={SysField.Setup} />
                  <FormItem label="社会信用代码" name="utscc" component={SysField.Utscc} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
                  <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label={supply ? '供应商来源' : '客户来源'} name="originId" component={SysField.OriginId} />
                  <FormItem label="邮箱" name="emall" component={SysField.Emall} rules={[{
                    message: '请输入正确的邮箱',
                    pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$'
                  }]} />
                </MegaLayout>

                <MegaLayout labelWidth={100} grid>
                  <FormItem label="网址" name="url" component={SysField.Url} rules={[{
                    message: '请输入正确的网址',
                    pattern: '^(http(s)?:\\/\\/)?(www\\.)?[\\w-]+\\.(com|net|cn)$'
                  }]} />
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
          {!props.value && <Col span={12} style={{height: '100%'}}>
            <div style={{height: '100%', overflow: 'auto'}}>
              <ProCard
                style={{marginTop: 24}}
                bodyStyle={{padding: 16}}
                title="联系人信息"
                className="h2Card"
                headerBordered>
                <FieldList
                  name="contactsParams"
                  initialValue={[
                    {
                      contactsName: wxUser && wxUser.openUserInfo && wxUser.openUserInfo.username,
                      companyRole: ''
                    },
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
                              bodyStyle={{padding: 16}}
                              title={<Title title={`联系人明细 ${index + 1}`} level={6} />}
                              headerBordered
                              extra={
                                <Button
                                  type="link"
                                  style={{float: 'right', display: state.value.length === 1 && 'none'}}
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
                                    required
                                  />
                                  <FormItem
                                    label="职务"
                                    name={`contactsParams.${index}.companyRole`}
                                    component={SysField.CompanyRoleId}
                                    required
                                  />
                                  {/* <ProCard style={{marginTop: 8}} headerBordered> */}
                                  <div style={{width: '88%', display: 'inline-block'}}>
                                    <FieldList
                                      name={`contactsParams.${index}.phoneParams`}
                                      initialValue={[
                                        {phoneNumber: wxUser && wxUser.phone},
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
                                                    label={`联系电话 ${indexs + 1}`}
                                                    name={`contactsParams.${index}.phoneParams.${indexs}.phoneNumber`}
                                                    component={SysField.PhoneNumber}
                                                    required
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
                                            <div style={{display: 'inline-block', height: 30,}}>
                                              <Button
                                                style={{display: state.value.length >= 5 && 'none'}}
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
                                <Divider style={{margin: '8px 0'}} />
                              </RowStyleLayout>
                            </ProCard>
                          );
                        })}
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          style={{width: '100%', display: state.value.length >= 5 && 'none'}}
                          onClick={onAdd}>增加联系人</Button>
                      </div>
                    );
                  }}
                </FieldList>
              </ProCard>

              <ProCard style={{marginTop: 8}} bodyStyle={{padding: 16}} title={supply ? '供应商地址' : '客户地址'} className="h2Card" headerBordered>
                <FieldList
                  name="adressParams"
                  initialValue={[
                    {region: data && data.length > 0 && data[0].id, location: ''},
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
                              title={<Title title={`地址明细 ${index + 1}`} level={6} />}
                              headerBordered
                              extra={
                                <Button
                                  type="link"
                                  style={{float: 'right', display: state.value.length === 1 && 'none'}}
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
          </Col>}
        </Row>
      </Form>
    </div>
  );
};

export default forwardRef(CustomerEdit);
