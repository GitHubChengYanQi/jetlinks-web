
import OemLayout from '@/pages/Portal';
import {BannerRouter} from '@/pages/Portal/banner/bannerRouter';

const ProtalRouterConfig = [
  {
    path: '/protal',
    name: '门户管理',
    component: OemLayout,
    children:[
      ...BannerRouter,
      {
        redirect: '/protal/banner',
      }
    ]
  }
];
export default ProtalRouterConfig;
