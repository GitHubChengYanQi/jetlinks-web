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

  const {all} = props;


  const [state, setState] = useState();

  const {loading: contactsLogin, data: Acontacts, run: AcontactsRun} = useRequest({
    url: '/contacts/list',
    method: 'POST',
  }, {
    manual: true
  });
  const {loading: phoneLogin, data: APhone, run: runAPhone} = useRequest({
    url: '/phone/list',
    method: 'POST',
  }, {
    manual: true
  });
  const {loading: adressLogin, data: Aadress, run: AadressRun} = useRequest({
    url: '/adress/list',
    method: 'POST',
  }, {
    manual: true
  });


  const formRef = useRef();

  const modalRef = useRef(null);


  return (
    <div>
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
        {all && <Card title='发货设置' bordered={false}>
          <FormItem
            label="客户"
            name="customerId"
            component={SysField.Customer}
            placeholder="请选择客户"
            customerid={async (customer) => {
              setState(true);
              if (customer) {
                await AcontactsRun({
                  data: {
                    customerId: customer
                  }
                });
                await AadressRun({
                  data: {
                    customerId: customer
                  }
                });
              }
            }}
            required
          />
          <FormItem
            label="联系人"
            name="contactsId"
            state={state}
            component={SysField.Contacts}
            placeholder="联系人"
            customerid={Acontacts || null}
            contactsid={async (contacts) => {
              if (contacts) {
                await runAPhone({
                  data: {
                    contactsId: contacts
                  }
                });
              }
            }}
            required
          />
          <FormItem
            label="联系人电话"
            name="phoneId"
            state={state}
            component={SysField.Phone}
            placeholder="请选择联系人电话"
            contactsid={APhone || null}
            required
          />
          <FormItem
            label="地址"
            name="adressId"
            state={state}
            component={SysField.Adress}
            placeholder="请选择地址"
            customerid={Aadress || null}
            required
          />
          {/*<FormItem*/}
          {/*  hidden*/}
          {/*  value={ids || null}*/}
          {/*  name="ids"*/}
          {/*  component={SysField.Ids}*/}
          {/*  required*/}
          {/*/>*/}
        </Card>}

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
