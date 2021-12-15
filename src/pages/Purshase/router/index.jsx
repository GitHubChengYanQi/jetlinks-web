import {PurchaseAskRouter} from '@/pages/Purshase/purchaseAsk/purchaseAskRouter';
import PurshaseLayout from '@/pages/Purshase';

const PurshaseRouterConfig = [
  {
    path: '/purchase',
    name: '采购管理',
    component: PurshaseLayout,
    children:[
      ...PurchaseAskRouter,
      {
        redirect: '/purchase/purchaseAsk',
      }
    ]
  }
];
export default PurshaseRouterConfig;
