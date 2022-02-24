import React, {useRef, useState} from 'react';
import ProCard from '@ant-design/pro-card';
import {Button, Col, notification, Row, Space} from 'antd';
import {MegaLayout} from '@formily/antd-components';
import {InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import * as SysField from './components/Field';
import Overflow from '@/components/Overflow';
import {Freight} from './components/Field';

const {FormItem} = Form;

const ApiConfig = {
  view: {},
  add: {},
  save: {}
};

const span = 6;
const labelWidth = 128;

const CreateOrder = ({...props}) => {

  const formRef = useRef();

  const [payPlan, setPayPlan] = useState();

  return <div style={{padding: 16}}>
    <div style={{padding: '16px 0'}}>
      <Breadcrumb title="创建采购单" />
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
        return false;
      }}
      effects={({setFieldState}) => {
      }}
      onSuccess={() => {
        history.push('/purchase/toBuyPlan');
        notification.success({
          message: '创建采购单成功！',
        });
      }}
    >

      <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="基本信息" headerBordered>
        <MegaLayout labelWidth={labelWidth}>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                module={11}
                label="采购编号"
                name="coding"
                component={SysField.Codings}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label="采购日期"
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
                label="采购单备注"
                name="remark"
                component={SysField.Remark}
              />
            </Col>
          </Row>
        </MegaLayout>
      </ProCard>

      <Overflow defaultHeight={280}>
        <Row gutter={24}>
          <Col span={12}>
            <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="甲方信息" headerBordered>
              <MegaLayout labelWidth={labelWidth}>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="公司名称"
                      name="A1"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="公司地址"
                      name="A2"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="委托代理"
                      name="A3"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="联系电话"
                      name="A4"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="开户银行"
                      name="A5"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="开户账号"
                      name="A6"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="法定代表人"
                      name="A7"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="开户行号"
                      name="A8"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="公司电话"
                      name="A9"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="公司传真"
                      name="A10"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="邮政编码"
                      name="A11"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
              </MegaLayout>
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="乙方信息" headerBordered>
              <MegaLayout labelWidth={labelWidth}>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="公司名称"
                      name="B1"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="公司地址"
                      name="B2"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="委托代理"
                      name="B3"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="联系电话"
                      name="B4"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="开户银行"
                      name="B5"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="开户账号"
                      name="B6"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="法定代表人"
                      name="B7"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="开户行号"
                      name="B8"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="公司电话"
                      name="B9"
                      component={SysField.Name}
                    />
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="公司传真"
                      name="B10"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem
                      label="邮政编码"
                      name="B11"
                      component={SysField.Name}
                    />
                  </Col>
                </Row>
              </MegaLayout>
            </ProCard>
          </Col>
        </Row>
      </Overflow>

      <FormItem
        name="skus"
        component={SysField.AddSku}
      />

      <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="财务信息" headerBordered>
        <MegaLayout labelWidth={labelWidth}>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label="采购总价"
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
                    return (
                      <Row gutter={24} key={index}>
                        <Col span={span}>
                          <Space align="start">
                            <FormItem
                              label={`第${index + 1}批`}
                              name={`paymentDetail.${index}.index`}
                              component={SysField.Index}
                            />
                            {
                              payPlan === 2
                                ?
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
                            name={`paymentDetail.${index}.number`}
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
                      </Row>
                    );
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

      <ProCard style={{marginTop: 24}} bodyStyle={{padding: 16}} className="h2Card" title="合同关联信息" headerBordered>
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
                label="合同模板"
                name="templateId"
                component={SysField.TemplateId}
              />
            </Col>
            <Col span={span}>
              <FormItem
                label="合同编码"
                name="contractCoding"
                module={12}
                component={SysField.Codings}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={span}>
              <FormItem
                label="采购日期"
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
                label="采购单备注"
                name="remark"
                component={SysField.Remark}
              />
            </Col>
          </Row>
        </MegaLayout>
      </ProCard>

    </Form>
  </div>;
};

export default CreateOrder;
