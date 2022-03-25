import React from 'react';
import {getSearchParams} from 'ice';
import Detail from '@/pages/Crm/contract/components/Detail';

const OrderDetail = () => {

  const params = getSearchParams();
  return <Detail id={params.id} />;
};

export default OrderDetail;
