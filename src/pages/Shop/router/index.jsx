import ShopLayout from '@/pages/Shop';
import {DaoxinPortalClassRouter} from '@/pages/Shop/daoxinPortalClass/daoxinPortalClassRouter';

const ShopRouterConfig = [
  {
    path: '/shop',
    name: '商城管理',
    component: ShopLayout,
    children:[
      ...DaoxinPortalClassRouter,
      {
        redirect: '/shop/daoxinPortalClass',
      }
    ]
  }
];
export default ShopRouterConfig;
