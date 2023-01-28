import React from 'react';
import Platform from '@/pages/statistical/components/Platform';
import Tenant from '@/pages/statistical/components/Tenant';
import store from '@/store';

const Statistical = () => {

  const [dataSource] = store.useModel('dataSource');

  const customer = dataSource.customer || {};

  if (customer.customerId) {
    return <Tenant customer={customer || {}}/>;
  } else {
    return <Platform/>;
  }
};

export default Statistical;
