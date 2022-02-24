import React, {useRef} from 'react';
import ProCard from '@ant-design/pro-card';
import {Col, notification, Row} from 'antd';
import {MegaLayout} from '@formily/antd-components';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import * as SysField from './components/Field';
import {Remark} from './components/Field';
import Overflow from '@/components/Overflow';

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
        component={SysField.Name}
      />

    </Form>
  </div>;
};

export default CreateOrder;
