/**
 * 编辑页
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React, {useEffect, useRef, useState} from 'react';
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
        />
      </Form>
    </div>
  );
};

export default DeliveryDetailsEdit;
