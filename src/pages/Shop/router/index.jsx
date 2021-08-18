
import {ClassDifferenceDetailsRouter} from '@/pages/Shop/classDifferenceDetails/classDifferenceDetailsRouter';
import ShopLayout from '@/pages/Shop';
import {DaoxinPortalClassRouter} from '@/pages/Shop/daoxinPortalClass/daoxinPortalClassRouter';

const ShopRouterConfig = [
  {
    path: '/shop',
    name: '商城管理',
    component: ShopLayout,
    children:[
      ...ClassDifferenceDetailsRouter,
      ...DaoxinPortalClassRouter,
      {
        redirect: '/shop/classDifferenceDetails',
      }
    ]
  }
];
export default ShopRouterConfig;
