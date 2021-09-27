import ShopLayout from '@/pages/Shop';
import {DaoxinPortalClassRouter} from '@/pages/Shop/daoxinPortalClass/daoxinPortalClassRouter';
import {GoodsRouter} from '@/pages/Shop/goods/goodsRouter';

const ShopRouterConfig = [
  {
    path: '/shop',
    name: '商城管理',
    component: ShopLayout,
    children:[
      {
        redirect: '/shop/daoxinPortalClass',
      }
    ]
  }
];
export default ShopRouterConfig;
