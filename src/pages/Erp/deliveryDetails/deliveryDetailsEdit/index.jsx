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
import CustomerAll from '@/pages/Crm/contract/components/CustomerAll';

const {FormItem} = Form;


const DeliveryDetailsEdit = ({...props}) => {

  const formRef = useRef();

  const {value, ids} = props;


  const ApiConfig = {
    view: deliveryDetailsDetail,
    add: {
      url: '/delivery/bulkShipment',
      method: 'POST',
    },
    save: deliveryDetailsEdit
  };

  const [state, setState] = useState();

  const {loading: contactsLogin, data: Acontacts, run: AcontactsRun} = useRequest({
    url: '/contacts/list',
    method: 'POST',
    data: {
      customerId: value.customerId === '' ? ' ' : value.customerId,
    }
  }, {
    manual: !value
  });
  const {loading: phoneLogin, data: APhone, run: runAPhone} = useRequest({
    url: '/phone/list',
    method: 'POST',
    data: {
      contactsId: value.contactsId === '' ? ' ' : value.contactsId,
    }
  }, {
    manual: !value
  });
  const {loading: adressLogin, data: Aadress, run: AadressRun} = useRequest({
    url: '/adress/list',
    method: 'POST',
    data: {
      customerId: value.customerId === '' ? ' ' : value.customerId,
    }
  }, {
    manual: !value
  });

  return (
    <div style={{padding:24}}>
      <Form
        {...props}
        value={value ? value.deliveryDetailsId : false}
        ref={formRef}
        api={ApiConfig}
        // fieldKey="deliveryDetailsId"
      >
        <CustomerAll />
        <FormItem
          hidden
          value={ids || null}
          name="ids"
          component={SysField.Ids}
          required
        />
      </Form>
    </div>
  );
};

export default DeliveryDetailsEdit;
