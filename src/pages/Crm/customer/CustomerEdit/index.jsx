/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {forwardRef, useImperativeHandle, useRef,} from 'react';
import {Button, Divider, Row, Col, Space, Card} from 'antd';
import ProCard from '@ant-design/pro-card';
import {getSearchParams, useHistory, useParams, useSearchParams} from 'ice';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, InternalFieldList as FieldList} from '@formily/antd';
import styled from 'styled-components';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import {
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';
import Title from '@/components/Title';

import style from './index.module.scss';
import {useRequest} from '@/util/Request';
import store from '@/store';
import Breadcrumb from '@/components/Breadcrumb';
import {Money, Name} from '@/pages/Crm/customer/CustomerField';

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

  const [userInfo] = store.useModel('user');

  const params = getSearchParams();

  const {wxUser, supply, data: paramData, ...other} = props;

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
    <div>
      <div style={{padding: 8}}>
        <Breadcrumb title="创建供应商" />
      </div>
      <Card title="创建供应商">
        <Form
          {...other}
          value={params.id || false}
          ref={formRef}
          defaultValue={{...paramData}}
          NoButton={false}
          api={ApiConfig}
          labelCol={5}
          wrapperCol={24}
          fieldKey="customerId"
          onSubmit={(value) => {
            return {...value, supply, ...paramData};
          }}
          onSuccess={(res) => {
            if (res && typeof onChange === 'function') {
              onChange(res);
            }
            props.onSuccess();
          }}
          formActions={formActions}
        >

          <div style={{height: '100%', overflow: 'auto'}}>
            <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="基本信息" headerBordered>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem
                    label={supply ? '供应商名称' : '客户名称'}
                    name="customerName"
                    component={SysField.CustomerName}
                    supply={supply}
                    onSuccess={(customerId) => {
                      history.push(`${supply === 1 ? '/purchase/supply/' : '/CRM/customer/'}${customerId}`);
                    }} required />
                </Col>
                <Col span={5}>
                  <FormItem label="企业简称" name="abbreviation" placeholder="请输入供应商简称" component={SysField.Abbreviation} />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem
                    label={supply ? '供应商级别' : '客户级别'}
                    name="customerLevelId"
                    component={SysField.CustomerLevelId}
                    required
                  />
                </Col>
                <Col span={5}>
                  {supply === 0 && <FormItem label="客户状态" name="status" component={SysField.Status} />}
                </Col>
                <Col span={5}>
                  {supply === 0 && <FormItem label="客户分类" name="classification" component={SysField.Classification} />}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem
                    label="联系人"
                    name="contactsName"
                    placeholder="请输入联系人姓名"
                    component={SysField.ContactsName}
                    required
                  />
                </Col>
                <Col span={5}>
                  <FormItem
                    label="联系电话"
                    placeholder="请输入联系电话"
                    name="phoneNumber"
                    component={SysField.PhoneNumber}
                    rules={[{
                      required: true,
                      message: '请输入正确的手机号码!',
                      pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
                    }]}
                  />
                </Col>
                <Col span={5}>
                  <FormItem
                    label="职务"
                    placeholder="请输入职务"
                    name="companyRole"
                    component={SysField.CompanyRoleId}
                  />
                </Col>
                <Col span={5}>
                  <FormItem
                    label="备注"
                    placeholder="请输入联系人备注"
                    name="contractNote"
                    component={SysField.Note}
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem
                    label="所属区域"
                    placeholder='请选择省市区地址'
                    name="region"
                    component={SysField.Region}
                  />

                </Col>
                <Col span={5}>
                  <FormItem
                    label="详细地址"
                    placeholder='请输入供应商地址'
                    name="map"
                    component={SysField.Map}
                  />
                </Col>
                <Col span={5}>
                  <FormItem
                    label="备注"
                    placeholder="请输入地址备注"
                    name="adressNote"
                    component={SysField.Note}
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem
                    label="开户银行"
                    name="k1"
                    placeholder="请输入开户银行"
                    component={SysField.PhoneNumber}
                  />
                </Col>
                <Col span={5}>
                  <FormItem
                    label="开户行号"
                    placeholder="请输入开户行号"
                    name="k2"
                    component={SysField.PhoneNumber}
                  />
                </Col>
                <Col span={5}>
                  <FormItem
                    label="开户账号"
                    placeholder="请输入开户账号"
                    name="k3"
                    component={SysField.PhoneNumber}
                  />
                </Col>
                <Col span={5}>
                  <FormItem
                    label="备注"
                    placeholder="请输入开户行备注"
                    name="k4"
                    component={SysField.Note}
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="采购负责人" name="userId" component={SysField.UserName} value={userInfo.id} />
                </Col>
                <Col span={5}>
                  注：供应商的负责人用于与供应商签订合同的指定负责人
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="备注说明" name="note" placeholder="请输入备注内容" component={SysField.RowsNote} />
                </Col>
              </Row>
            </ProCard>

            <ProCard
              title="企业其他信息"
              className="h2Card"
              headerBordered
              bodyStyle={{padding: 16}}
            >
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="法人" name="legal" placeholder="请输入法人姓名" component={SysField.Legal} />
                </Col>
                <Col span={5}>
                  <FormItem
                    label="统一社会信用代码"
                    labelCol={7}
                    placeholder="请输入企业社会信用代码"
                    name="utscc"
                    component={SysField.Utscc} />
                </Col>
                <Col span={5}>
                  <FormItem label="企业类型" name="companyType" placeholder="请选择企业类型" component={SysField.CompanyType} />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="注册资本" name="money" placeholder="请输入注册资本" component={SysField.Money} />
                </Col>
                <Col span={5}>
                  <FormItem label="所属行业" placeholder="请选择企业行业" name="industryId" component={SysField.IndustryOne} />
                </Col>
                <Col span={5}>
                  <FormItem label="成立日期" name="setup" placeholder="请选择企业类型" component={SysField.Setup} />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="企业电话" name="phone" placeholder="请输入企业电话" component={SysField.Name} />
                </Col>
                <Col span={5}>
                  <FormItem label="企业传真" placeholder="请输入企业传真" name="cz" component={SysField.Name} />
                </Col>
                <Col span={5}>
                  <FormItem label="企业邮编" name="yb" placeholder="请输入企业邮编" component={SysField.Name} />
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="邮箱" placeholder="请输入邮箱地址" name="emall" component={SysField.Emall} rules={[{
                    message: '请输入正确的邮箱',
                    pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$'
                  }]} />
                </Col>
                <Col span={5}>
                  <FormItem label="网址" name="url" placeholder="请输入供应商网址" component={SysField.Url} rules={[{
                    message: '请输入正确的网址',
                    pattern: '^(http(s)?:\\/\\/)?(www\\.)?[\\w-]+\\.(com|net|cn)$'
                  }]} />
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="注册地址" name="signIn" placeholder="请输入注册地址" component={SysField.Map} />
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="附件" name="file" component={SysField.File} />
                </Col>
                <Col span={5}>
                  仅支持上传一张格式为JPG、PNG、PDF格式的图片，建议上传企业营业执照
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={5}>
                  <FormItem label="企业简介" name="introduction" placeholder="请输入企业简介" component={SysField.Introduction} />
                </Col>
              </Row>
            </ProCard>
          </div>
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
                                  />
                                  <FormItem
                                    label="职务"
                                    name={`contactsParams.${index}.companyRole`}
                                    component={SysField.CompanyRoleId}
                                  />
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

              {/*<ProCard*/}
              {/*  style={{marginTop: 8}}*/}
              {/*  bodyStyle={{padding: 16}}*/}
              {/*  title={supply ? '供应商地址' : '客户地址'}*/}
              {/*  className="h2Card" headerBordered>*/}
              {/*  <FieldList*/}
              {/*    name="adressParams"*/}
              {/*    initialValue={[*/}
              {/*      {region: data && data.length > 0 && data[0].id, location: ''},*/}
              {/*    ]}*/}
              {/*  >*/}
              {/*    {({state, mutators}) => {*/}
              {/*      const onAdd = () => mutators.push();*/}
              {/*      return (*/}
              {/*        <div>*/}
              {/*          {state.value.map((item, index) => {*/}
              {/*            const onRemove = index => mutators.remove(index);*/}
              {/*            return (*/}
              {/*              <ProCard*/}
              {/*                headStyle={{borderLeft: 'none', padding: '8px 16px'}}*/}
              {/*                title={<Title title={`地址明细 ${index + 1}`} level={6} />}*/}
              {/*                headerBordered*/}
              {/*                extra={*/}
              {/*                  <Button*/}
              {/*                    type="link"*/}
              {/*                    style={{float: 'right', display: state.value.length === 1 && 'none'}}*/}
              {/*                    icon={<DeleteOutlined />}*/}
              {/*                    onClick={() => {*/}
              {/*                      onRemove(index);*/}
              {/*                    }}*/}
              {/*                    danger*/}
              {/*                  />}*/}
              {/*                key={index}>*/}
              {/*                <FormItem*/}
              {/*                  label="省市区地址"*/}
              {/*                  name={`adressParams.${index}.region`}*/}
              {/*                  component={SysField.Region}*/}
              {/*                />*/}
              {/*                <AdressRowStyleLayout key={index}>*/}
              {/*                  <FormItem*/}
              {/*                    label="&nbsp;&nbsp;&nbsp;&nbsp;详细地址"*/}
              {/*                    name={`adressParams.${index}.map`}*/}
              {/*                    component={SysField.Map}*/}
              {/*                  />*/}
              {/*                </AdressRowStyleLayout>*/}
              {/*                <Divider style={{margin: '8px 0'}} />*/}
              {/*              </ProCard>*/}
              {/*            );*/}
              {/*          })}*/}
              {/*          <Button*/}
              {/*            type="dashed"*/}
              {/*            style={{width: '100%'}}*/}
              {/*            icon={<PlusOutlined />}*/}
              {/*            onClick={onAdd}>增加客户地址</Button>*/}
              {/*        </div>*/}
              {/*      );*/}
              {/*    }}*/}
              {/*  </FieldList>*/}
              {/*</ProCard>*/}
            </div>
          </Col>}
        </Form>
      </Card>
    </div>
  );
};

export default forwardRef(CustomerEdit);
