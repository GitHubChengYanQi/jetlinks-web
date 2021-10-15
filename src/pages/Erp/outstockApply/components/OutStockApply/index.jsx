import Form from '@/components/Form';
import * as SysField from '@/pages/Erp/outstockApply/outstockApplyField';
import {Button, Card, Col, Row} from 'antd';
import React, {useRef, useState} from 'react';
import {itemsAdd, itemsDetail, itemsEdit} from '@/pages/Erp/items/ItemsUrl';
import {
  OutBound,
  outstockApplyAdd,
  outstockApplyDetail,
  outstockApplyEdit
} from '@/pages/Erp/outstockApply/outstockApplyUrl';
import {Dh, Gs, Type, Types} from '@/pages/Erp/outstockApply/outstockApplyField';
import ApplyDetailsList from '@/pages/Erp/outstockApply/applyDetails/applyDetailsList';
import ProCard from '@ant-design/pro-card';

const ApiConfig = {
  view: outstockApplyDetail,
  add: OutBound,
  save: OutBound
};


const OutStockApply = (props) => {

  const formRef = useRef();


  const [type, setType] = useState();

  const types = () => {
    switch (type) {
      case 0:
        return (
          <>
            <Form.FormItem label="物流公司" component={SysField.Gs} name="logisticsCompany" required />
            <Form.FormItem label="物流单号" component={SysField.Dh} name="logisticsNumber" required />
          </>
        );
      case 1:
        return (
          <>
            <Form.FormItem label="司机姓名" component={SysField.Dh} name="driverName" required />
            <Form.FormItem label="电话" component={SysField.Dh} name="driverPhone" required />
            <Form.FormItem label="车牌号" component={SysField.Dh} name="licensePlate" required />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card title='一键发货' style={{padding: '0 24px'}}>
      <Row gutter={24}>
        <Col span={12}>
          <ProCard style={{margin: 16}} headerBordered className="h2Card" title="发货清单" bordered={false}>
            <ApplyDetailsList value={props.value} />
          </ProCard>
        </Col>
        <Col span={12}>
          <ProCard style={{margin: 16}} headerBordered className="h2Card" title="发货信息" bordered={false}>
            <Form
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="outstockApplyId"
              onSuccess={() => {
                props.onSuccess();
              }}
            >
              <Form.FormItem label="仓库" component={SysField.StoreHouse} name="stockId" required />
              <Form.FormItem label="物流方式" component={SysField.Types} name="deliveryWay" required onChange={(value) => {
                setType(value);
              }} />
              {types()}
              <div style={{display: 'none'}}>
                <Form.FormItem label="负责人" component={SysField.Type} name="userId" required />
                <Form.FormItem label="客户" component={SysField.Type} name="customerId" required />
                <Form.FormItem label="地址" component={SysField.Type} name="adressId" required />
                <Form.FormItem label="联系人" component={SysField.Type} name="contactsId" required />
                <Form.FormItem label="电话" component={SysField.Type} name="phoneId" required />
              </div>
            </Form>
          </ProCard>
        </Col>
      </Row>
    </Card>
  );
};

export default OutStockApply;
