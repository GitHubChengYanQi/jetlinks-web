/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef} from 'react';
import {Anchor, Button, Collapse} from 'antd';
import {
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/pages/Crm/customer/CustomerEdit/components/From';
import ProCard from '@ant-design/pro-card';
import {useHistory} from 'ice';
import {MegaLayout} from '@formily/antd-components';
import {InternalFieldList as FieldList} from '@formily/antd';
import styled from 'styled-components';

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
    width: 25%;
  }
`;


const ApiConfig = {
  view: customerDetail,
  add: customerAdd,
  save: customerEdit
};


const CustomerEdit = ({...props}) => {


  const formRef = useRef();

  const history = useHistory();

  return (
    <div style={{height: 1000}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="customerId"

      >
        <div style={{height: 900}}>

          <div style={{float: 'left', width: '50%'}}>

            <ProCard style={{marginTop: 8}} title="基本信息" headerBordered>
              <MegaLayout labelWidth={120}>
                <FormItem
                  label="客户名称" name="customerName" component={SysField.CustomerName}
                  method={props.value}
                  onSuccess={(customerId) => {
                    props.onSuccess();
                    history.push(`/CRM/customer/${customerId}`);
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
          <div style={{float: 'left', width: '50%', height: 900, overflow:'auto'}}>
            <ProCard style={{marginTop: 8}} title="联系人信息" headerBordered>
              <FieldList
                name="contactsParams"
              >
                {({state, mutators}) => {
                  const onAdd = () => mutators.push();
                  return (
                    <div>
                      {state.value.map((item, index) => {
                        const onRemove = index => mutators.remove(index);
                        return (
                          <RowStyleLayout key={index}>
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
                            {/* eslint-disable-next-line react/jsx-no-bind */}
                            <Button onClick={onRemove.bind(null, index)}>删除</Button>
                            {/*<ProCard style={{marginTop: 8}} headerBordered>*/}
                            <div style={{marginBottom: 20}}>
                              <FieldList
                                name={`contactsParams.${index}.phoneParams`}
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
                                              label="电话号码"
                                              name={`contactsParams.${index}.phoneParams.${indexs}.phoneNumber`}
                                              component={SysField.PhoneNumber}
                                              required
                                            />
                                            {/* eslint-disable-next-line react/jsx-no-bind */}
                                            <Button onClick={onRemove.bind(null, indexs)}>删除</Button>
                                          </PhoneRowStyleLayout>
                                        );
                                      })}

                                      <Button onClick={onAdd}>增加联系人电话</Button>
                                    </div>
                                  );
                                }}
                              </FieldList>
                            </div>
                            {/*</ProCard>*/}
                          </RowStyleLayout>
                        );
                      })}


                      <Button onClick={onAdd}>增加联系人</Button>
                    </div>
                  );
                }}
              </FieldList>
            </ProCard>

            <ProCard style={{marginTop: 8}} title="客户地址" headerBordered>
              <FieldList
                name="adressParams"
              >
                {({state, mutators}) => {
                  const onAdd = () => mutators.push();
                  return (
                    <div>
                      {state.value.map((item, index) => {
                        const onRemove = index => mutators.remove(index);
                        return (
                          <AdressRowStyleLayout key={index}>
                            <FormItem
                              label="地址"
                              name={`adressParams.${index}.location`}
                              component={SysField.Location}
                              required
                            />
                            <FormItem
                              label="经度"
                              name={`adressParams.${index}.longitude`}
                              component={SysField.Longitude}
                              required
                            />
                            <FormItem
                              label="纬度"
                              name={`adressParams.${index}.latitude`}
                              component={SysField.Latitude}
                              required
                            />
                            {/* eslint-disable-next-line react/jsx-no-bind */}
                            <Button onClick={onRemove.bind(null, index)}>删除</Button>
                          </AdressRowStyleLayout>
                        );
                      })}
                      <Button onClick={onAdd}>增加客户地址</Button>
                    </div>
                  );
                }}
              </FieldList>
            </ProCard>


          </div>


        </div>
      </Form>
    </div>
  );
};

export default CustomerEdit;
