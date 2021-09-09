
import OemLayout from '@/pages/Portal';
import {BannerRouter} from '@/pages/Portal/banner/bannerRouter';
import {NavigationRouter} from '@/pages/Portal/navigation/navigationRouter';
import {GoodsRouter} from "@/pages/Shop/goods/goodsRouter";
import {RepairRouter} from '@/pages/Repair/repair/repairRouter';
import RepairLayout from '@/pages/Repair';

const RepairRouterConfig = [
  {
    path: '/REPAIR',
    name: '售后管理',
    component: RepairLayout,
    children:[
      ...RepairRouter,
      {
        redirect: '/REPAIR/repair',
      }
    ]
  }
];
export default RepairRouterConfig;

