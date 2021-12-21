import React from 'react';
import {useParams} from 'ice';
import CustomerDetail from '@/pages/Crm/customer/CustomerDetail';

const SupplyDetail = () => {

  const params = useParams();

  return <CustomerDetail id={params.cid} />;
};

export default SupplyDetail;
