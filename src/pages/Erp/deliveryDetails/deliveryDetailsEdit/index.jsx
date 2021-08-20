/**
 * 编辑页
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React, {useRef, useState} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {deliveryDetailsDetail, deliveryDetailsAdd, deliveryDetailsEdit} from '../deliveryDetailsUrl';
import * as SysField from '../deliveryDetailsField';
import {useRequest} from '@/util/Request';
import ProSkeleton from '@ant-design/pro-skeleton';

const {FormItem} = Form;

const ApiConfig = {
  view: deliveryDetailsDetail,
  add: deliveryDetailsAdd,
  save: deliveryDetailsEdit
};

const DeliveryDetailsEdit = ({...props}) => {

  const formRef = useRef();

  const {value} = props;

  const [state, setState] = useState();

  const {loading:contactsLogin,data: Acontacts, run: AcontactsRun} = useRequest({
    url: '/contacts/list',
    method: 'POST',
    data: {
      customerId: value.customerId === '' ? ' ' : value.customerId,
    }
  },);
  const {loading:phoneLogin,data: APhone, run: runAPhone} = useRequest({
    url: '/phone/list',
    method: 'POST',
    data: {
      contactsId: value.contactsId === '' ? ' ' : value.contactsId,
    }
  });
  const {loading:adressLogin,data: Aadress, run: AadressRun} = useRequest({
    url: '/adress/list',
    method: 'POST',
    data: {
      customerId: value.customerId === '' ? ' ' : value.customerId,
    }
  });

  return (
    <Form
      {...props}
      value={value ? value.deliveryDetailsId : false}
      ref={formRef}
      api={ApiConfig}
      fieldKey="deliveryDetailsId"
    >

      <FormItem
        label="客户"
        name="customerId"
        value={value.customerId || null}
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
        value={value.contactsId || null}
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
        value={value.phoneId || null}
        state={state}
        component={SysField.Phone}
        placeholder="请选择联系人电话"
        contactsid={APhone || null}
        required
      />
      <FormItem
        label="地址"
        value={value.adressId || null}
        name="adressId"
        state={state}
        component={SysField.Adress}
        placeholder="请选择地址"
        customerid={Aadress || null}
        required
      />
    </Form>
  );
};

export default DeliveryDetailsEdit;
