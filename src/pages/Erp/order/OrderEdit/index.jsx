/**
 * 订单表编辑页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef} from 'react';

import Form from '@/components/Form';
import {Col, Row} from "antd";
import {orderDetail, orderAdd, orderEdit} from '../OrderUrl';
import * as SysField from '../OrderField';

const {FormItem} = Form;

const ApiConfig = {
  view: orderDetail,
  add: orderAdd,
  save: orderEdit
};

const OrderEdit = ({...props}) => {
  const formRef = useRef();

  return (
    <>

      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="order_id"
      >
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="合同名称" name="contractName" component={SysField.contractName} required/>
          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="甲方" name="partyA" component={SysField.Customer}  disabled required/>
          </Col>
          <Col span={11}>
            <FormItem label="甲方联系人" name="partyAContactsId" component={SysField.ContactsId} disabled required/>
          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="甲方联系地址" name="partyAAdressId" component={SysField.AdressId} disabled required/>
          </Col>
          <Col span={11}>
            <FormItem label="甲方联系人电话" name="partyAPhone" component={SysField.Phone}  disabled required/>
          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="乙方" name="partyB" component={SysField.Customer} disabled required/>
          </Col>
          <Col span={11}>
            <FormItem label="乙方联系人" name="partyBContactsId" component={SysField.ContactsId} disabled required/>
          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="乙方联系地址" name="partyBAdressId" component={SysField.AdressId}  disabled required/>
          </Col>
          <Col span={11}>
            <FormItem label="乙方联系人电话" name="partyBPhone" component={SysField.Phone}   disabled required/>
          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="产品名称" name="itemId" component={SysField.ItemId} disabled required/>
          </Col>
          <Col span={11}>
            <FormItem label="订单状态" name="state" component={SysField.State} disabled required/>
          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="订单数量" name="number" component={SysField.Number} required/>
          </Col>
          <Col span={11}>
            <FormItem label="金额" name="price" component={SysField.StockItemId} required/>
          </Col>
        </Row>
      </Form>

    </>
  );
};

export default OrderEdit;
