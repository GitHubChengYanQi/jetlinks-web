import React, {useRef, useState} from 'react';
import Form from '@/components/Form';

import {
  outBound,
  outstockOrderAdd,
  outstockOrderDetail,
} from '@/pages/Erp/outstock/outstockOrder/outstockOrderUrl';
import * as SysField from '@/pages/Erp/outstock/outstockOrder/outstockOrderField';
import OutstockListingList from '@/pages/Erp/outstock/outstockListing/outstockListingList';
import {Button, Card, Col, Row} from 'antd';
import Modal from '@/components/Modal';
import {useRequest} from '@/util/Request';
import ProCard from '@ant-design/pro-card';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outBound
};


const OutStock = (props) => {


  const formRef = useRef();

  return (
    <Card title="出库设置" bordered={false}>
      <Row gutter={23}>
        <Col span={12}>
          <ProCard className="h2Card" title="出库清单" headerBordered>
            <OutstockListingList value={props.value} />
          </ProCard>
        </Col>
        <Col span={12}>
          <ProCard className="h2Card" title="出库信息" headerBordered>
            <Form
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="outstockOrderId"
            >

              <FormItem
                label="选择仓库"
                name="storehouseId"
                component={SysField.Storhouse}
                required
              />
              <FormItem
                label="选择经手人"
                name="userId"
                component={SysField.UserId}
                required
              />
              <FormItem
                label="备注"
                name="note"
                component={SysField.Note}
                required
              />
              <div style={{display: 'none'}}>
                <FormItem
                  hidden
                  name="state"
                  component={SysField.State}
                />
              </div>

            </Form>
          </ProCard>
        </Col>
      </Row>
    </Card>

  );
};
export default OutStock;
