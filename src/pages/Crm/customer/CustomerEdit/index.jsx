/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef,} from 'react';
import {Button, Row, Col, Card, Affix, message, Space, notification} from 'antd';
import ProCard from '@ant-design/pro-card';
import {getSearchParams, useHistory} from 'ice';
import {createFormActions, FormEffectHooks, FormPath, InternalFieldList as FieldList, MegaLayout} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import {
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';
import {request} from '@/util/Request';
import store from '@/store';
import Breadcrumb from '@/components/Breadcrumb';
import {contactsDetail} from '@/pages/Crm/contacts/contactsUrl';

const {FormItem} = Form;
const formActions = createFormActions();

const span = 6;
const labelWidth = 128;

const formActionsPublic = createFormActions();

const CustomerEdit = ({onChange, ...props}) => {

  const ApiConfig = {
    view: customerDetail,
    add: customerAdd,
    save: customerEdit
  };

  const [data] = store.useModel('dataSource');

  const params = getSearchParams();

  const {wxUser, supply, data: paramData, ...other} = props;

  const formRef = useRef();

  const history = useHistory();

  if (wxUser) {
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
          formatResult={formActionsPublic}
          value={params.id || false}
          ref={formRef}
          defaultValue={{...paramData}}
          NoButton={false}
          api={ApiConfig}
          labelAlign="right"
          wrapperCol={24}
          fieldKey="customerId"
          onSubmit={(value) => {
            // 供应商物料
            const supplyParams = [];
            let brands = true;
            value.supplyParams.map((item) => {
              if (Array.isArray(item.brandIds)) {
                item.brandIds.map((brandItem) => {
                  return supplyParams.push({
                    skuId: item.skuId,
                    brandId: brandItem
                  });
                });
              } else {
                brands = false;
              }
              return null;
            });
            if (!brands) {
              message.warn('请选择物料的品牌！');
              return false;
            }

            // 联系人
            const contactsParams = [];
            contactsParams.push({
              contactsName: value.contactsName.id ? value.contactsName.id : value.contactsName.name,
              phoneParams: [{phoneNumber: value.phoneNumber}],
              deptName: value.deptName && (value.deptName.id ? value.deptName.id : value.deptName.name),
              positionName: value.companyRole && (value.companyRole.id ? value.companyRole.id : value.companyRole.name),
            });
            value.contactsParams && value.contactsParams.map((item) => {
              if (item && item.contactsName) {
                contactsParams.push({
                  contactsName: item.contactsName.id ? item.contactsName.id : item.contactsName.name,
                  phoneParams: [{phoneNumber: item.phoneNumber}],
                  deptName: item.deptName && (item.deptName.id ? item.deptName.id : item.deptName.name),
                  positionName: value.companyRole && (value.companyRole.id ? value.companyRole.id : value.companyRole.name),
                });
              }
              return null;
            });

            // 地址
            let adressParams = [];
            adressParams.push({
              map: value.map,
              detailLocation: value.detailLocation,
              region: value.region,
            });
            if (value.adressParams) {
              adressParams = adressParams.concat(value.adressParams.filter((item) => {
                return item && (item.region || item.detailLocation || item.map);
              }));
            }

            // 开户信息
            let invoiceParams = [];
            if (value.bankNo || value.bankAccount || value.invoiceNote || value.bank) {
              invoiceParams.push({
                bank: value.bank,
                bankNo: value.bankNo,
                bankAccount: value.bankAccount,
              });
            }
            if (value.invoiceParams) {
              invoiceParams = invoiceParams.concat(value.invoiceParams.filter((item) => {
                return item && (item.bankNo || item.bankAccount || item.bank);
              }));
            }

            return {...value, supply, supplyParams, contactsParams, adressParams, invoiceParams};
          }}
          effects={({setFieldState}) => {
            FormEffectHooks.onFieldValueChange$('contactsName').subscribe(async ({value}) => {
              let res;
              if (value && value.id) {
                res = await request({
                  ...contactsDetail,
                  data: {
                    contactsId: value.id
                  }
                });
              }
              setFieldState('phoneNumber', state => {
                if (res) {
                  const phoneNumber = res.phoneParams && res.phoneParams[0] && res.phoneParams[0].phoneNumber;
                  state.value = phoneNumber;
                } else {
                  state.value = null;
                }
                state.props.disabled = res;
              });
              setFieldState('deptName', state => {
                if (res) {
                  state.value = {name: res.deptResult && res.deptResult.fullName};
                } else {
                  state.value = null;
                }
                state.props.disabled = res;
              });
              setFieldState('companyRole', state => {
                if (res) {
                  state.value = {name: res.companyRoleResult.position};
                } else {
                  state.value = null;
                }
                state.props.disabled = res;
              });
            });

            FormEffectHooks.onFieldValueChange$('contactsParams.*.contactsName').subscribe(async ({name, value}) => {
              let res;
              if (value && value.id) {
                res = await request({
                  ...contactsDetail,
                  data: {
                    contactsId: value.id
                  }
                });
              }

              setFieldState(
                FormPath.transform(name, /\d/, ($1) => {
                  return `contactsParams.${$1}.phoneNumber`;
                }), state => {
                  if (res) {
                    const phoneNumber = res.phoneParams && res.phoneParams[0] && res.phoneParams[0].phoneNumber;
                    state.value = phoneNumber;
                  } else {
                    state.value = null;
                  }
                  state.props.disabled = res;
                });
              setFieldState(
                FormPath.transform(name, /\d/, ($1) => {
                  return `contactsParams.${$1}.deptName`;
                }), state => {
                  if (res) {
                    state.value = {name: res.deptResult && res.deptResult.fullName};
                  } else {
                    state.value = null;
                  }
                  state.props.disabled = res;
                });
              setFieldState(
                FormPath.transform(name, /\d/, ($1) => {
                  return `contactsParams.${$1}.companyRole`;
                }), state => {
                  if (res) {
                    state.value = {name: res.companyRoleResult && res.companyRoleResult.position};
                  } else {
                    state.value = null;
                  }
                  state.props.disabled = res;
                });
            });
          }}
          onSuccess={(res) => {
            if (res && typeof onChange === 'function') {
              onChange(res);
            }
            history.push('/purchase/supply');
            notification.success({
              message: '创建供应商成功！',
            });
          }}
          formActions={formActions}
        >
          <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="基本信息" headerBordered>
            <MegaLayout labelWidth={labelWidth}>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem
                    label={supply ? '供应商名称' : '客户名称'}
                    name="customerName"
                    component={SysField.CustomerName}
                    supply={supply}
                    onSuccess={(customerId) => {
                      history.push(`${supply === 1 ? '/purchase/supply/' : '/CRM/customer/'}${customerId}`);
                    }}
                    required
                  />
                </Col>
                <Col span={span}>
                  <FormItem label="企业简称" name="abbreviation" placeholder="请输入供应商简称" component={SysField.Abbreviation} />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={span}>
                  <FormItem
                    label={supply ? '供应商级别' : '客户级别'}
                    name="customerLevelId"
                    component={SysField.CustomerLevelId}
                    required
                  />

                </Col>
                <Col span={span}>
                  {supply === 0 && <FormItem label="客户状态" name="status" component={SysField.Status} />}
                </Col>
                <Col span={span}>
                  {supply === 0 && <FormItem label="客户分类" name="classification" component={SysField.Classification} />}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={span}>
                  <FormItem
                    label="联系人"
                    name="contactsName"
                    placeholder="请输入联系人姓名"
                    component={SysField.ContactsName}
                    required
                  />
                </Col>
                <Col span={span}>
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
                <Col span={span}>
                  <FormItem
                    label="部门"
                    placeholder="请选择部门"
                    name="deptName"
                    component={SysField.DeptName}
                  />
                </Col>
                <Col span={span}>
                  <FormItem
                    label="职务"
                    placeholder="请选择职务"
                    name="companyRole"
                    component={SysField.CompanyRoleId}
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={span}>
                  <FormItem
                    label="所属区域"
                    placeholder="请选择省市区地址"
                    name="region"
                    options={data && data.area}
                    component={SysField.Region}
                  />

                </Col>
                <Col span={span}>
                  <FormItem
                    label="详细地址"
                    placeholder="请输入供应商地址"
                    name="detailLocation"
                    component={SysField.Url}
                  />
                </Col>
                <Col span={span}>
                  <FormItem
                    label="定位地址"
                    disabled
                    placeholder="请选择地址"
                    name="map"
                    component={SysField.Map}
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={span}>
                  <FormItem
                    label="开户银行"
                    name="bank"
                    placeholder="请输入开户银行"
                    component={SysField.PhoneNumber}
                  />
                </Col>
                <Col span={span}>
                  <FormItem
                    label="开户行号"
                    placeholder="请输入开户行号"
                    name="bankNo"
                    component={SysField.PhoneNumber}
                  />
                </Col>
                <Col span={span}>
                  <FormItem
                    label="开户账号"
                    placeholder="请输入开户账号"
                    name="bankAccount"
                    component={SysField.BankAccount}
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="备注说明" name="note" placeholder="请输入备注内容" component={SysField.RowsNote} />
                </Col>
              </Row>
            </MegaLayout>
          </ProCard>
          <div title="添加物料">
            <FormItem
              name="supplyParams"
              component={SysField.AddSku}
            />
          </div>
          <ProCard title="企业其他信息" className="h2Card" headerBordered bodyStyle={{padding: 16}}>
            <MegaLayout labelWidth={labelWidth}>
              <Row gutter={24}>
                <Col span={span}>
                  <FormItem label="法人" name="legal" placeholder="请输入法人姓名" component={SysField.Legal} />
                </Col>
                <Col span={span}>
                  <FormItem
                    label="统一社会信用代码"
                    placeholder="请输入企业社会信用代码"
                    name="utscc"
                    component={SysField.Utscc} />
                </Col>
                <Col span={span}>
                  <FormItem label="企业类型" name="companyType" placeholder="请选择企业类型" component={SysField.CompanyType} />
                </Col>
                <Col span={span}>
                  <FormItem
                    label="注册资本"
                    name="registeredCapital"
                    style={{width: 200}}
                    placeholder="请输入注册资本"
                    component={SysField.Money} />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={span}>
                  <FormItem label="所属行业" placeholder="请选择企业行业" name="industryId" component={SysField.IndustryOne} />
                </Col>
                <Col span={span}>
                  <FormItem label="成立日期" name="setup" placeholder="请选择企业类型" component={SysField.Setup} />
                </Col>
                <Col span={span}>
                  <FormItem label="企业电话" name="telephone" placeholder="请输入企业电话" component={SysField.Name} />
                </Col>
                <Col span={span}>
                  <FormItem label="企业传真" placeholder="请输入企业传真" name="fax" component={SysField.Name} />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={span}>
                  <FormItem label="企业邮编" name="zipCode" placeholder="请输入企业邮编" component={SysField.Name} />
                </Col>
                <Col span={span}>
                  <FormItem label="企业邮箱" placeholder="请输入邮箱地址" name="emall" component={SysField.Emall} rules={[{
                    message: '请输入正确的邮箱',
                    pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$'
                  }]} />
                </Col>
                <Col span={span}>
                  <FormItem label="网址" name="url" placeholder="请输入供应商网址" component={SysField.Url} rules={[{
                    message: '请输入正确的网址',
                    pattern: '^(http(s)?:\\/\\/)?(www\\.)?[\\w-]+\\.(com|net|cn)$'
                  }]} />
                </Col>
                <Col span={span}>
                  <FormItem label="注册地址" name="signIn" placeholder="请输入注册地址" component={SysField.SignIn} />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Space align='start'>
                    <FormItem label="附件" name="file" component={SysField.File} />仅支持上传一张格式为JPG、PNG、PDF格式的图片，建议上传企业营业执照
                  </Space>
                </Col>
                <Col span={12}>
                  <FormItem label="企业简介" name="introduction" placeholder="请输入企业简介" component={SysField.Introduction} />
                </Col>
              </Row>
            </MegaLayout>
          </ProCard>
          <div title="其他联系人">
            <MegaLayout labelWidth={labelWidth}>
              <FieldList
                name="contactsParams"
              >
                {({state, mutators}) => {
                  const onAdd = () => mutators.push();
                  return <ProCard
                    extra={
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        style={{width: '100%', display: state.value.length >= 5 && 'none'}}
                        onClick={onAdd}>添加联系人</Button>
                    }
                    style={{marginTop: 24}}
                    bodyStyle={{padding: 16}}
                    title="其他联系人"
                    className="h2Card"
                    headerBordered
                  >
                    <div>
                      {state.value.map((item, index) => {
                        const onRemove = index => mutators.remove(index);
                        return <div key={index}>
                          <Row gutter={24}>
                            <Col span={span}>
                              <FormItem
                                label="联系人"
                                name={`contactsParams.${index}.contactsName`}
                                placeholder="请输入联系人姓名"
                                component={SysField.ContactsName}
                              />
                            </Col>
                            <Col span={span}>
                              <FormItem
                                label="联系电话"
                                placeholder="请输入联系电话"
                                name={`contactsParams.${index}.phoneNumber`}
                                component={SysField.PhoneNumber}
                                rules={[{
                                  message: '请输入正确的手机号码!',
                                  pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
                                }]}
                              />
                            </Col>
                            <Col span={span}>
                              <FormItem
                                label="部门"
                                placeholder="请选择部门"
                                name={`contactsParams.${index}.deptName`}
                                component={SysField.DeptName}
                              />
                            </Col>
                            <Col span={span}>
                              <div style={{display: 'inline-block'}}>
                                <FormItem
                                  label="职务"
                                  name={`contactsParams.${index}.companyRole`}
                                  placeholder="请选择职务"
                                  component={SysField.CompanyRoleId}
                                />
                              </div>
                              <Button
                                type="link"
                                style={{float: 'right'}}
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  onRemove(index);
                                }}
                                danger
                              />
                            </Col>
                          </Row>
                        </div>;
                      })}
                    </div>
                  </ProCard>;
                }}
              </FieldList>
            </MegaLayout>
          </div>
          <div title="其他地址">
            <MegaLayout labelWidth={labelWidth}>
              <FieldList name="adressParams">
                {({state, mutators}) => {
                  const onAdd = () => mutators.push();
                  return <ProCard
                    extra={
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        style={{width: '100%', display: state.value.length >= 5 && 'none'}}
                        onClick={onAdd}>添加地址</Button>
                    }
                    style={{marginTop: 24}}
                    bodyStyle={{padding: 16}}
                    title="其他地址"
                    className="h2Card"
                    headerBordered
                  >
                    <div>
                      {state.value.map((item, index) => {
                        const onRemove = index => mutators.remove(index);
                        return <div key={index}>
                          <Row gutter={24}>
                            <Col span={span}>
                              <FormItem
                                label="所属区域"
                                placeholder="请选择省市区地址"
                                name={`adressParams.${index}.region`}
                                component={SysField.Region}
                                options={data && data.area}
                              />

                            </Col>
                            <Col span={span}>
                              <FormItem
                                label="详细地址"
                                placeholder="请输入供应商地址"
                                name={`adressParams.${index}.detailLocation`}
                                component={SysField.Url}
                              />
                            </Col>
                            <Col span={span}>
                              <FormItem
                                label="定位地址"
                                placeholder="请选择地址"
                                disabled
                                name={`adressParams.${index}.map`}
                                component={SysField.Map}
                              />
                            </Col>
                            <Col span={span}>
                              <Button
                                type="link"
                                style={{float: 'right'}}
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  onRemove(index);
                                }}
                                danger
                              />
                            </Col>
                          </Row>
                        </div>;
                      })}
                    </div>
                  </ProCard>;
                }}
              </FieldList>
            </MegaLayout>
          </div>
          <div title="其他开户信息">
            <MegaLayout labelWidth={labelWidth}>
              <FieldList name="invoiceParams">
                {({state, mutators}) => {
                  const onAdd = () => mutators.push();
                  return <ProCard
                    extra={
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        style={{width: '100%', display: state.value.length >= 5 && 'none'}}
                        onClick={onAdd}>添加开户信息</Button>
                    }
                    style={{marginTop: 24}}
                    bodyStyle={{padding: 16}}
                    title="其他开户信息"
                    className="h2Card"
                    headerBordered
                  >
                    <div>
                      {state.value.map((item, index) => {
                        const onRemove = index => mutators.remove(index);
                        return <div key={index}>
                          <Row gutter={24}>
                            <Col span={span}>
                              <FormItem
                                label="开户银行"
                                name={`invoiceParams.${index}.bank`}
                                placeholder="请输入开户银行"
                                component={SysField.PhoneNumber}
                              />
                            </Col>
                            <Col span={span}>
                              <FormItem
                                label="开户行号"
                                placeholder="请输入开户行号"
                                name={`invoiceParams.${index}.bankNo`}
                                component={SysField.PhoneNumber}
                              />
                            </Col>
                            <Col span={span}>
                              <FormItem
                                label="开户账号"
                                placeholder="请输入开户账号"
                                name={`invoiceParams.${index}.bankAccount`}
                                component={SysField.BankAccount}
                              />
                            </Col>
                            <Col span={span}>
                              <Button
                                type="link"
                                style={{float: 'right'}}
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  onRemove(index);
                                }}
                                danger
                              />
                            </Col>
                          </Row>
                        </div>;
                      })}
                    </div>
                  </ProCard>;
                }}
              </FieldList>
            </MegaLayout>
          </div>
        </Form>
      </Card>

      <Affix offsetBottom={0}>
        <div
          style={{height: 47, borderTop: '1px solid #e7e7e7', background: '#fff', textAlign: 'center', paddingTop: 8}}>
          <Space>
            <Button type="primary" onClick={() => {
              formRef.current.submit();
            }}>保存</Button>
            <Button onClick={() => {
              history.push('/purchase/supply');
            }}>取消</Button>
          </Space>
        </div>
      </Affix>

    </div>
  );
};

export default CustomerEdit;
