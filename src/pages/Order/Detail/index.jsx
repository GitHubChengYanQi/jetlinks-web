import React from 'react';
import {getSearchParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useRequest} from '@/util/Request';
import {orderDetail} from '@/pages/Erp/order/OrderUrl';
import Detail from '@/pages/Crm/contract/components/Detail';
import Empty from '@/components/Empty';

const OrderDetail = ({id, status, ...props}) => {

  const params = getSearchParams();

  const {loading, data, refresh} = useRequest(orderDetail, {
    defaultParams: {
      data: {
        orderId: params.id || id,
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!(data && data.contractId)) {
    return <Empty />;
  }


  return <Detail id={data.contractId} noContent />;
};

export default OrderDetail;
