import React, {useEffect, useRef, useState} from 'react';
import ProCard from '@ant-design/pro-card';
import {Affix, Button, Col, Divider, Drawer, message, notification, Row, Space} from 'antd';
import {MegaLayout} from '@formily/antd-components';
import {FormEffectHooks, InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {getSearchParams, useHistory, useLocation} from 'ice';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import * as SysField from './components/Field';
import * as CustomerSysField from './components/CustomerAll';
import Overflow from '@/components/Overflow';
import CustomerEdit from '@/pages/Crm/customer/CustomerEdit';
import {EffectsAction} from '@/pages/Order/CreateOrder/components/EffectsAction';
import store from '@/store';
import Modal from '@/components/Modal';
import PaymentTemplateList from '@/pages/Purshase/paymentTemplate/paymentTemplateList';
import {request, useRequest} from '@/util/Request';
import {paymentTemplateDetail, paymentTemplateListSelect} from '@/pages/Purshase/paymentTemplate/paymentTemplateUrl';
import Empty from '@/components/Empty';

const {FormItem} = Form;

const ApiConfig = {
  view: {},
  add: {
    url: '/order/add',
    method: 'POST'
  },
  save: {}
};

const span = 6;
const labelWidth = 128;

const CreateOrder = ({...props}) => {

  const params = getSearchParams();
  const location = useLocation();

  const module = () => {
    switch (params.module) {
      case 'SO':
        return {
          title: '创建销售单',
          success: '创建销售单成功!',
          coding: '销售单编号',
          dateTitle: '销售日期',
          noteTitle: '销售单备注',
          moneyTitle: '销售总价',
          detailTitle: '销售明细',
        };
      case 'PO':
        return {
          title: '创建采购单',
          success: '创建采购单成功!',
          coding: '采购单编号',
          dateTitle: '采购日期',
          noteTitle: '采购单备注',
          moneyTitle: '采购总价',
          detailTitle: '采购明细',
        };
      default:
        break;
    }
  };

  const ref = useRef();

  const history = useHistory();

  const {loading, data, refresh} = useRequest({...paymentTemplateListSelect, data: {oftenUser: 1}},);

  const [userInfo] = store.useModel('user');

  const formRef = useRef();

  const [payPlan, setPayPlan] = useState();

  const [visible, setVisible] = useState();

  useEffect(() => {
    if (payPlan === 4) {
      setPayPlan(null);
      ref.current.open(true);
    }
  }, [payPlan]);

  if (!module) {
    return <Empty />;
  }

  return <div style={{padding: 16}}>
    <div style={{padding: '16px 0'}}>
      <Breadcrumb title={module().title} />
    </div>

    <Form
      value={false}
      ref={formRef}
      NoButton={false}
      api={ApiConfig}
      labelAlign="right"
      wrapperCol={24}
      fieldKey="customerId"
      onSubmit={(value) => {
        console.log(value);

        if (value.paymentDetail) {
          let percentum = 0;
          value.paymentDetail.map((item) => {
            return percentum += item.percentum;
          });
          if (percentum !== 100) {
            message.warn('请检查付款批次！');
            return false;
          }
        } else {
          message.warn('请输入付款批次！');
          return false;
        }

        value = {
          ...value,
          type: 1,
          paymentParam: {
            detailParams: value.paymentDetail,
            payMethod: value.payMethod,
            freight: value.freight,
            deliveryWay: value.deliveryWay,
            adressId: value.adressId,
            payPlan: value.payPlan,
            remark: value.remark,
          },
          contractParam: {
            contractReplaces: value.allField,
            templateId: value.templateId,
            coding: value.contractCoding,
          }
        };
        return value;
      }}
      effects={({setFieldState, getFieldState}) => {
        EffectsAction(setFieldState, getFieldState);

        FormEffectHooks.onFieldValueChange$('payPlan').subscribe(async ({value}) => {
          if (value) {
            setPayPlan(value);
            switch (value) {
              case 2:
              case 3:
              case 4:
                setFieldState('paymentDetail', (state) => {
                  state.value = [{}];
                });
                break;
              default:
                // eslint-disable-next-line no-case-declarations
                const res = await request({...paymentTemplateDetail, data: {templateId: value}});
                setFieldState('paymentDetail', (state) => {
                  state.value = res.templates;
                });
                break;
            }
          }

        });
      }}
      onSuccess={() => {
        history.goBack();
        notification.success({
          message: module().success,
        });
      }}
    >

      <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="基本信息" headerBordered>
        <MegaLayout labelWidth={labelWidth}>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                module={11}
                label={module().coding}
                name="coding"
                component={SysField.Codings}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label={module().dateTitle}
                name="date"
                component={SysField.Date}
              />
            </Col>
            <Col span={span}>
              <FormItem
                label="币种"
                name="currency"
                component={SysField.Currency}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label={module().noteTitle}
                name="remark"
                component={SysField.Remark}
              />
            </Col>
          </Row>
        </MegaLayout>
      </ProCard>

      <Overflow defaultHeight={300}>
        <Row gutter={24}>
          <Col span={12}>
            <ProCard
              bodyStyle={{padding: 16}}
              className="h2Card"
              title="甲方信息"
              headerBordered
              extra={params.module === 'SO' && <Button onClick={() => {
                setVisible(true);
              }}>新建客户</Button>}
              headStyle={{height: 49}}
            >
              <MegaLayout labelWidth={labelWidth}>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      value={params.module === 'PO' && userInfo.customerId}
                      dataParams={params.module === 'PO' && {status: 99}}
                      label="公司名称"
                      placeholder="请选择甲方公司"
                      name="buyerId"
                      component={CustomerSysField.Customer}
                      required
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="公司地址"
                      placeholder="请选择甲方公司地址"
                      name="partyAAdressId"
                      component={CustomerSysField.Adress}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="委托代理"
                      placeholder="请选择甲方公司委托代理"
                      name="partyAContactsId"
                      component={CustomerSysField.Contacts}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="联系电话"
                      placeholder="请选择甲方公司联系电话"
                      name="partyAPhone"
                      component={CustomerSysField.Phone}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="开户银行"
                      placeholder="请选择甲方开户银行"
                      name="partyABankId"
                      component={CustomerSysField.Bank}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="开户账号"
                      placeholder="请选择甲方开户账号"
                      name="partyABankAccount"
                      component={CustomerSysField.BankAccount}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="法定代表人"
                      name="partyALegalPerson"
                      component={SysField.Show}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="开户行号"
                      placeholder="请选择甲方开户行号"
                      name="partyABankNo"
                      component={SysField.Show}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="公司电话"
                      name="partyACompanyPhone"
                      component={SysField.Show}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="公司传真"
                      name="partyAFax"
                      component={SysField.Show}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="邮政编码"
                      name="partyAZipCode"
                      component={SysField.Show}
                    />
                  </Col>
                </Row>
              </MegaLayout>
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard
              bodyStyle={{padding: 16}}
              headStyle={{height: 49}}
              className="h2Card"
              title="乙方信息"
              extra={params.module === 'PO' && <Button onClick={() => {
                setVisible(true);
              }}>新建供应商</Button>}
              headerBordered>
              <MegaLayout labelWidth={labelWidth}>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      value={params.module === 'SO' && userInfo.customerId}
                      dataParams={params.module === 'SO' && {status: 99}}
                      label="公司名称"
                      placeholder="请选择甲方公司"
                      name="sellerId"
                      component={CustomerSysField.Customer}
                      required
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="公司地址"
                      placeholder="请选择甲方公司地址"
                      name="partyBAdressId"
                      component={CustomerSysField.Adress}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="委托代理"
                      placeholder="请选择甲方公司委托代理"
                      name="partyBContactsId"
                      component={CustomerSysField.Contacts}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="联系电话"
                      placeholder="请选择甲方公司联系电话"
                      name="partyBPhone"
                      component={CustomerSysField.Phone}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="开户银行"
                      placeholder="请选择甲方开户银行"
                      name="partyBBankId"
                      component={CustomerSysField.Bank}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="开户账号"
                      placeholder="请选择乙方开户账号"
                      name="partyBBankAccount"
                      component={CustomerSysField.BankAccount}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="法定代表人"
                      name="partyBLegalPerson"
                      component={SysField.Show}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="开户行号"
                      placeholder="请选择甲方开户行号"
                      name="partyBBankNo"
                      component={SysField.Show}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="公司电话"
                      name="partyBCompanyPhone"
                      component={SysField.Show}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="公司传真"
                      name="partyBFax"
                      component={SysField.Show}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="邮政编码"
                      name="partyBZipCode"
                      component={SysField.Show}
                    />
                  </Col>
                </Row>
              </MegaLayout>
            </ProCard>
          </Col>
        </Row>
      </Overflow>

      <ProCard bodyStyle={{padding: 16}} className="h2Card" title={module().detailTitle} headerBordered>
        <FormItem
          module={params.module}
          name="detailParams"
          value={Array.isArray(JSON.parse(params.state)) && JSON.parse(params.state)}
          component={SysField.AddSku}
        />
      </ProCard>

      <ProCard bodyStyle={{padding: 16}} className="h2Card" title="财务信息" headerBordered>
        <MegaLayout labelWidth={labelWidth}>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label={module().moneyTitle}
                name="money"
                component={SysField.Money}
              />
            </Col>
            <Col span={span}>
              <FormItem
                label="是否含运费"
                name="freight"
                value={1}
                component={SysField.Freight}
              />
            </Col>
            <Col span={span}>
              <FormItem
                label="结算方式"
                name="payMethod"
                component={SysField.PayMethod}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label="交货方式"
                name="deliveryWay"
                component={SysField.DeliveryWay}
              />
            </Col>
            <Col span={span}>
              <FormItem
                label="交货地址"
                name="adressId"
                component={SysField.AdressId}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label="付款计划"
                name="payPlan"
                data={data}
                loading={loading}
                component={SysField.PayPlan}
              />
            </Col>
          </Row>
          <FieldList
            name="paymentDetail"
            initialValue={[
              {},
            ]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => mutators.remove(index);
                    return <Row gutter={24} key={index}>
                      <Col span={span}>
                        <Space align="start">
                          <FormItem
                            label={`第${index + 1}批`}
                            name={`paymentDetail.${index}.index`}
                            component={SysField.Index}
                          />
                          {
                            payPlan === 2 ?
                              <FormItem
                                label="付款日期"
                                name={`paymentDetail.${index}.payTime`}
                                component={SysField.PayTime}
                              />
                              :
                              <>
                                <FormItem
                                  name={`paymentDetail.${index}.payType`}
                                  component={SysField.PayType}
                                />
                                <FormItem
                                  name={`paymentDetail.${index}.dateNumber`}
                                  component={SysField.dateNumber}
                                />
                                <FormItem
                                  name={`paymentDetail.${index}.dateWay`}
                                  component={SysField.DateWay}
                                />
                              </>
                          }
                        </Space>
                      </Col>
                      <Col span={span}>
                        <FormItem
                          label="付款比例"
                          name={`paymentDetail.${index}.percentum`}
                          component={SysField.Percentum}
                        />
                      </Col>
                      <Col span={span}>
                        <FormItem
                          itemStyle={{margin: 0}}
                          label="付款金额"
                          name={`paymentDetail.${index}.money`}
                          component={SysField.Money}
                        />
                      </Col>
                      <Col span={span}>
                        <Space align="start">
                          <FormItem
                            label="款项说明"
                            placeholder="请输入付款的款项说明"
                            rows={1}
                            name={`paymentDetail.${index}.remark`}
                            component={SysField.Remark}
                          />
                          <Button
                            type="link"
                            style={{float: 'right'}}
                            disabled={state.value.length === 1}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              onRemove(index);
                            }}
                            danger
                          />
                        </Space>
                      </Col>
                    </Row>;
                  })}
                  <Button
                    type="dashed"
                    style={{marginTop: 8, marginBottom: 16, marginLeft: labelWidth}}
                    icon={<PlusOutlined />}
                    onClick={onAdd}>添加付款批次</Button>
                </div>
              );
            }}
          </FieldList>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label="财务备注"
                name="paymentRemark"
                placeholder="请输入财务备注"
                component={SysField.Remark}
              />
            </Col>
          </Row>
        </MegaLayout>
      </ProCard>

      <ProCard bodyStyle={{padding: 16}} className="h2Card" title="合同关联信息" headerBordered>
        <MegaLayout labelWidth={labelWidth}>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label="是否需要生成合同"
                name="generateContract"
                component={SysField.Freight}
              />
            </Col>
            <Col span={span}>
              <FormItem
                visible={false}
                label="合同模板"
                name="templateId"
                component={SysField.TemplateId}
              />
            </Col>
            <Col span={span}>
              <FormItem
                label="合同编码"
                visible={false}
                name="contractCoding"
                module={12}
                component={SysField.Codings}
              />
            </Col>
          </Row>
          <MegaLayout labelWidth={200} labelAlign="top">
            <FormItem
              visible={false}
              label="合同模板中的其他字段"
              name="allField"
              component={SysField.AllField}
            />
          </MegaLayout>
        </MegaLayout>
      </ProCard>

      <Divider />

      <MegaLayout labelWidth={labelWidth}>
        <FormItem
          label="其他约定项"
          name="note"
          component={SysField.Note}
        />
      </MegaLayout>
    </Form>

    <Drawer
      title="添加供应商"
      placement="bottom"
      extra={<Button onClick={() => {
        setVisible(false);
      }}>关闭</Button>}
      height="100%"
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <CustomerEdit add />
    </Drawer>

    <Modal
      headTitle="添加付款计划模板"
      width={800}
      {...props}
      component={PaymentTemplateList}
      ref={ref}
      onClose={() => {
        ref.current.close();
        refresh();
      }}
    />

    <Affix offsetBottom={0}>
      <div
        style={{height: 47, borderTop: '1px solid #e7e7e7', background: '#fff', textAlign: 'center', paddingTop: 8}}>
        <Space>
          <Button type="primary" onClick={() => {
            formRef.current.submit();
          }}>保存</Button>
          <Button onClick={() => {
            history.push('/purchase/toBuyPlan');
          }}>取消</Button>
        </Space>
      </div>
    </Affix>
  </div>;
};

export default CreateOrder;
