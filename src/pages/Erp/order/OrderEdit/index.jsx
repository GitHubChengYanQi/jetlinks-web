/**
 * 订单表编辑页
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

import React, {useRef} from 'react';

import Form from '@/components/Form';
import {orderDetail, orderAdd, orderEdit} from '../OrderUrl';
import * as SysField from '../OrderField';
import {Col, Row} from "antd";


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
            <FormItem label="订单人姓名" name="contactsId" component={SysField.ContactsId} required/>
          </Col>
          <Col span={11}>
            <FormItem label="联系电话" name="phone" component={SysField.ClientId} required/>

          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="订单数量" name="number" component={SysField.Number} disabled required/>
          </Col>
          <Col span={11}>
            <FormItem label="金额" name="price" component={SysField.StockItemId} disabled required/>
          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="订单地址" name="adressId" component={SysField.AdressId} required/>
          </Col>
          <Col span={11}>
            <FormItem label="订单状态" name="state" component={SysField.State} required/>
          </Col>
        </Row>
        <Row gutter={24} style={{padding: '0 30px'}}>
          <Col span={13}>
            <FormItem label="产品名称" name="itemId" component={SysField.ItemId} disabled required/>
          </Col>
          <Col span={11}>
            <FormItem label="订单时间" name="orderTime" component={SysField.OrderTime} required/>
          </Col>
        </Row>
      </Form>

    </>
  );
};

export default OrderEdit;
