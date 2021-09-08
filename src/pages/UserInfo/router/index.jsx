
import OemLayout from '@/pages/Portal';
import {BannerRouter} from '@/pages/Portal/banner/bannerRouter';
import {NavigationRouter} from '@/pages/Portal/navigation/navigationRouter';
import {GoodsRouter} from "@/pages/Portal/goods/goodsRouter";
import {RepairRouter} from '@/pages/Repair/repair/repairRouter';
import UsrInfoLayout from '@/pages/UserInfo';
import {OpenUserInfoRouter} from '@/pages/UserInfo/openUserInfo/openUserInfoRouter';

const UserInfoRouterConfig = [
  {
    path: '/userInfo',
    name: '绑定微信用户',
    component: UsrInfoLayout,
    children:[
      ...OpenUserInfoRouter,
      {
        redirect: '/userInfo/openUserInfo',
      }
    ]
  }
];
export default UserInfoRouterConfig;

