
import OemLayout from '@/pages/Portal';
import {BannerRouter} from '@/pages/Portal/banner/bannerRouter';
import {NavigationRouter} from '@/pages/Portal/navigation/navigationRouter';
import {GoodsRouter} from "@/pages/Shop/goods/goodsRouter";
import {RepairRouter} from '@/pages/Repair/repair/repairRouter';
import {DaoxinPortalClassRouter} from '@/pages/Shop/daoxinPortalClass/daoxinPortalClassRouter';

const ProtalRouterConfig = [
  {
    path: '/protal',
    name: '门户管理',
    component: OemLayout,
    children:[
      ...BannerRouter,
      ...NavigationRouter,
      ...DaoxinPortalClassRouter,
      ...GoodsRouter,
      {
        redirect: '/protal/banner',
      }
    ]
  }
];
export default ProtalRouterConfig;
