/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {forwardRef, useImperativeHandle, useRef, useState,} from 'react';
import {Button, Row, Col, Card, Table, Affix} from 'antd';
import ProCard from '@ant-design/pro-card';
import {getSearchParams, useHistory} from 'ice';
import {createFormActions, InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {useBoolean} from 'ahooks';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import {
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';

import {useRequest} from '@/util/Request';
import store from '@/store';
import Breadcrumb from '@/components/Breadcrumb';
import {commonArea} from '@/pages/Crm/adress/AdressUrl';

const {FormItem} = Form;
const formActions = createFormActions();

const span = 4;

const CustomerEdit = ({onChange, ...props}) => {

  const ApiConfig = {
    view: customerDetail,
    add: customerAdd,
    save: customerEdit
  };

  const [userInfo] = store.useModel('user');

  const params = getSearchParams();

  const [visible, setVisible] = useState();

  const {data: adressData} = useRequest(commonArea);

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
          value={params.id || false}
          ref={formRef}
          defaultValue={{...paramData}}
          NoButton={false}
          api={ApiConfig}
          labelCol={8}
          labelAlign="right"
          wrapperCol={16}
          fieldKey="customerId"
          onSubmit={(value) => {
            console.log(value);
            return false;
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

          <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="基本信息" headerBordered>
            <Row gutter={24}>
              <Col span={span}>
                <FormItem
                  label={supply ? '供应商名称' : '客户名称'}
                  name="customerName"
                  component={SysField.CustomerName}
                  supply={supply}
                  onSuccess={(customerId) => {
                    history.push(`${supply === 1 ? '/purchase/supply/' : '/CRM/customer/'}${customerId}`);
                  }} required />
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
                  name="contractDept"
                  component={SysField.CompanyRoleId}
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
              <Col span={span}>
                <FormItem
                  label="备注"
                  placeholder="请输入联系人备注"
                  name="contractNote"
                  component={SysField.Note}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={span}>
                <FormItem
                  label="所属区域"
                  placeholder="请选择省市区地址"
                  name="region"
                  options={adressData}
                  component={SysField.Region}
                />

              </Col>
              <Col span={span}>
                <FormItem
                  label="详细地址"
                  placeholder="请输入供应商地址"
                  name="map"
                  component={SysField.Map}
                />
              </Col>
              <Col span={span}>
                <FormItem
                  label="备注"
                  placeholder="请输入地址备注"
                  name="adressNote"
                  component={SysField.Note}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={span}>
                <FormItem
                  label="开户银行"
                  name="k1"
                  placeholder="请输入开户银行"
                  component={SysField.PhoneNumber}
                />
              </Col>
              <Col span={span}>
                <FormItem
                  label="开户行号"
                  placeholder="请输入开户行号"
                  name="k2"
                  component={SysField.PhoneNumber}
                />
              </Col>
              <Col span={span}>
                <FormItem
                  label="开户账号"
                  placeholder="请输入开户账号"
                  name="k3"
                  component={SysField.PhoneNumber}
                />
              </Col>
              <Col span={span}>
                <FormItem
                  label="备注"
                  placeholder="请输入开户行备注"
                  name="k4"
                  component={SysField.Note}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="采购负责人" name="userId" component={SysField.UserName} value={userInfo.id} />
              </Col>
              <Col span={span}>
                注：供应商的负责人用于与供应商签订合同的指定负责人
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="备注说明" name="note" placeholder="请输入备注内容" component={SysField.RowsNote} />
              </Col>
            </Row>
          </ProCard>

          <ProCard
            style={{marginTop: 24}}
            bodyStyle={{padding: 16}}
            className="h2Card"
            title="供应物料"
            headerBordered
            extra={<Button onClick={() => {
              setVisible(true);
            }}>添加物料</Button>}
          >
            <FormItem
              name="skus"
              modalVisible={visible}
              component={SysField.AddSku}
              setModalVisible={setVisible}
            />
          </ProCard>

          <ProCard title="企业其他信息" className="h2Card" headerBordered bodyStyle={{padding: 16}}>
            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="法人" name="legal" placeholder="请输入法人姓名" component={SysField.Legal} />
              </Col>
              <Col span={span}>
                <FormItem
                  style={{whiteSpace: 'normal'}}
                  label="统一社会信用代码"
                  labelCol={10}
                  placeholder="请输入企业社会信用代码"
                  name="utscc"
                  component={SysField.Utscc} />
              </Col>
              <Col span={span}>
                <FormItem label="企业类型" name="companyType" placeholder="请选择企业类型" component={SysField.CompanyType} />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="注册资本" name="money" placeholder="请输入注册资本" component={SysField.Money} />
              </Col>
              <Col span={span}>
                <FormItem label="所属行业" placeholder="请选择企业行业" name="industryId" component={SysField.IndustryOne} />
              </Col>
              <Col span={span}>
                <FormItem label="成立日期" name="setup" placeholder="请选择企业类型" component={SysField.Setup} />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="企业电话" name="phone" placeholder="请输入企业电话" component={SysField.Name} />
              </Col>
              <Col span={span}>
                <FormItem label="企业传真" placeholder="请输入企业传真" name="cz" component={SysField.Name} />
              </Col>
              <Col span={span}>
                <FormItem label="企业邮编" name="yb" placeholder="请输入企业邮编" component={SysField.Name} />
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="邮箱" placeholder="请输入邮箱地址" name="emall" component={SysField.Emall} rules={[{
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
            </Row>

            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="注册地址" name="signIn" placeholder="请输入注册地址" component={SysField.Map} />
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="附件" name="file" component={SysField.File} />
              </Col>
              <Col span={span}>
                仅支持上传一张格式为JPG、PNG、PDF格式的图片，建议上传企业营业执照
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={span}>
                <FormItem label="企业简介" name="introduction" placeholder="请输入企业简介" component={SysField.Introduction} />
              </Col>
            </Row>
          </ProCard>
          <div title="其他联系人">
            <FieldList
              name="contactsParams"
              initialValue={[{
                contactsName: wxUser && wxUser.openUserInfo && wxUser.openUserInfo.username,
                companyRole: ''
              },]}>
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
                              // name={`contactsParams.${index}.phoneParams.${indexs}.phoneNumber`}
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
                              name={`contactsParams.${index}.contractDept`}
                              component={SysField.CompanyRoleId}
                            />
                          </Col>
                          <Col span={span}>
                            <FormItem
                              label="职务"
                              name={`contactsParams.${index}.companyRole`}
                              placeholder="请选择职务"
                              component={SysField.CompanyRoleId}
                            />
                          </Col>
                          <Col span={span}>
                            <FormItem
                              label="备注"
                              name={`contactsParams.${index}.contractNote`}
                              placeholder="请输入联系人备注"
                              component={SysField.Note}
                            />
                          </Col>
                          <Col span={1}>
                            <Button
                              type="link"
                              style={{float: 'right', display: state.value.length === 1 && 'none'}}
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
          </div>
          <div title="其他地址">
            <FieldList name="adressParams" initialValue={[{}]}>
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
                              options={adressData}
                            />

                          </Col>
                          <Col span={span}>
                            <FormItem
                              label="详细地址"
                              placeholder="请输入供应商地址"
                              name={`adressParams.${index}.map`}
                              component={SysField.Map}
                            />
                          </Col>
                          <Col span={span}>
                            <FormItem
                              label="备注"
                              placeholder="请输入地址备注"
                              name="adressNote"
                              component={SysField.Note}
                            />
                          </Col>
                          <Col span={1}>
                            <Button
                              type="link"
                              style={{float: 'right', display: state.value.length === 1 && 'none'}}
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
          </div>
          <div title="其他开户信息">
            <FieldList name="kaihu" initialValue={[{}]}>
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
                              name={`kaihu.${index}.k1`}
                              placeholder="请输入开户银行"
                              component={SysField.PhoneNumber}
                            />
                          </Col>
                          <Col span={span}>
                            <FormItem
                              label="开户行号"
                              placeholder="请输入开户行号"
                              name={`kaihu.${index}.k2`}
                              component={SysField.PhoneNumber}
                            />
                          </Col>
                          <Col span={span}>
                            <FormItem
                              label="开户账号"
                              placeholder="请输入开户账号"
                              name={`kaihu.${index}.k23`}
                              component={SysField.PhoneNumber}
                            />
                          </Col>
                          <Col span={span}>
                            <FormItem
                              label="备注"
                              placeholder="请输入开户行备注"
                              name={`kaihu.${index}.k4`}
                              component={SysField.Note}
                            />
                          </Col>
                          <Col span={1}>
                            <Button
                              type="link"
                              style={{float: 'right', display: state.value.length === 1 && 'none'}}
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
          </div>


        </Form>
      </Card>

      <Affix offsetBottom={16}>
        <Button onClick={() => {
          formRef.current.submit();
        }}>保存</Button>
      </Affix>

    </div>
  );
};

export default CustomerEdit;
