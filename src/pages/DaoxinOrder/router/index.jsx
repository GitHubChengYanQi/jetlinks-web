
import OrderSystem from '@/pages/DaoxinOrder';
import {OrderRouter} from '@/pages/DaoxinOrder/order/orderRouter';
import {OrderBranchRouter} from '@/pages/DaoxinOrder/orderBranch/orderBranchRouter';

const OrderRouterConfig = [
  {
    path: '/ORDER_SYSTEM',
    name: '订单管理',
    component: OrderSystem,
    children:[
      ...OrderRouter,
      ...OrderBranchRouter,

      {
        redirect: '/ORDER_SYSTEM/order',
      }

    ]
  }
];
export default OrderRouterConfig;


