import {PurchaseAskRouter} from '@/pages/Purshase/purchaseAsk/purchaseAskRouter';
import PurshaseLayout from '@/pages/Purshase';
import {SupplyListingRouter} from '@/pages/Purshase/Supply/router';

const PurshaseRouterConfig = [
  {
    path: '/purchase',
    name: '采购管理',
    component: PurshaseLayout,
    children:[
      ...PurchaseAskRouter,
      ...SupplyListingRouter,
      {
        redirect: '/purchase/supply',
      }
    ]
  }
];
export default PurshaseRouterConfig;
