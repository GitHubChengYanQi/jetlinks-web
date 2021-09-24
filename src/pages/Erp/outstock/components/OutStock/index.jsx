import React, {useRef, useState} from 'react';
import Form from '@/components/Form';

import {
  outBound,
  outstockOrderAdd,
  outstockOrderDetail,
} from '@/pages/Erp/outstock/outstockOrder/outstockOrderUrl';
import * as SysField from '@/pages/Erp/outstock/outstockOrder/outstockOrderField';
import OutstockListingList from '@/pages/Erp/outstock/outstockListing/outstockListingList';
import {Button, Card} from 'antd';
import Modal from '@/components/Modal';
import {useRequest} from '@/util/Request';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outBound
};


const OutStock = (props) => {



  const formRef = useRef();

  const modalRef = useRef(null);


  return (
    <div style={{padding:24}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="outstockOrderId"
      >
        <Card title="出库设置" bordered={false}>
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

        </Card>

        <Button style={{float: 'right'}} type="link" onClick={() => {
          modalRef.current.open(props.value);
        }}>
          点击查看出库清单
        </Button>


      </Form>


      <Modal width={1000} component={OutstockListingList} ref={modalRef} onSuccess={() => {

      }} />
    </div>

  );
};
export default OutStock;
