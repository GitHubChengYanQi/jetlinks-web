import React from 'react';
import {getSearchParams} from 'ice';
import Empty from '@/components/Empty';
import Detail from '@/pages/Crm/contract/components/Detail';

const ContractDetail = () => {

  const params = getSearchParams();

  switch (params.source) {
    case '销售':
    case '采购':
      return <Detail id={params.sourceId} />;
    default:
      return <Empty/>;
  }

};

export default ContractDetail;
