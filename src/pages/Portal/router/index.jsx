
import OemLayout from '@/pages/Portal';
import {BannerRouter} from '@/pages/Portal/banner/bannerRouter';
import {NavigationRouter} from '@/pages/Portal/navigation/navigationRouter';

const ProtalRouterConfig = [
  {
    path: '/protal',
    name: '门户管理',
    component: OemLayout,
    children:[
      ...BannerRouter,
      ...NavigationRouter,
      {
        redirect: '/protal/banner',
      }
    ]
  }
];
export default ProtalRouterConfig;