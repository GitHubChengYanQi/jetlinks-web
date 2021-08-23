/**
 * 报修编辑页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useRef, useState} from 'react';
import {Button, Col, Input, Row, Steps} from 'antd';
import Form from '@/components/Form';
import {repairDetail, repairAdd, repairEdit} from '../repairUrl';
import * as SysField from '../repairField';
import FormIndex from '@/components/Form/FormIndex';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/customer/CustomerEdit/components/ContactsEdit';
import CompanyAddressEdit from '@/pages/Portal/companyAddress/companyAddressEdit';

const {FormItem} = Form;

const ApiConfig = {
  view: repairDetail,
  add: repairAdd,
  save: repairEdit
};

const RepairEdit = ({...props}) => {

  const {Step} = Steps;
  const [result, setResult] = useState(props.value);
  const [repair, setRepair] = useState();
  const [current, setCurrent] = React.useState(0);
  const formRef = useRef();

  const steps = [

    {
      title: '添加使用单位',
      content:
        <>
          <div style={{margin: '5px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="repairId"
              success={(result) => {
                setRepair(result.data);
                setResult(result.data.repairId);
                next();
              }}
            >
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="使用单位" name="customerId" component={SysField.CustomerId} required />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="省" name="province" component={SysField.Province} required />
                </Col>
                <Col span={12}>
                  <FormItem label="市" name="city" component={SysField.City} required />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="区" name="area" component={SysField.Area} required />
                </Col>
                <Col span={12}>
                  <FormItem label="详细地址" name="address" component={SysField.Address} required />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="姓名" name="people" component={SysField.People} required />
                </Col>
                <Col span={12}>
                  <FormItem label="电话" name="telephone" component={SysField.Telephone} required />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="职务" name="position" component={SysField.Position} required />
                </Col>
              </Row>
              <div style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">
                  下一步
                </Button>
              </div>
            </FormIndex>
          </div>
        </>
    },
    {
      title: '添加报修信息',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="repairId"
              success={(result) => {
                props.onSuccess();
              }}
            >
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="描述" name="comment" component={SysField.Comment} required />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="设备" name="itemId" component={SysField.ItemId} repair={repair || null} required />
                </Col>
                <Col span={12}>
                  <FormItem label="服务类型" name="serviceType" component={SysField.ServiceType} required />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="期望到达日期" name="expectTime" component={SysField.ExpectTime} required />
                </Col>
                <Col span={12}>
                  <FormItem label="维修费用" name="money" component={SysField.Money} required />
                </Col>
              </Row>
              <div style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">
                  完成
                </Button>
              </div>
            </FormIndex>
          </div>

        </>
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Steps current={current} style={{padding: '30px 150px '}}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </>
  );
};

export default RepairEdit;
