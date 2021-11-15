import {ToolRouter} from '@/pages/Erp/tool/toolRouter';
import {QualityCheckRouter} from '@/pages/Erp/qualityCheck/qualityCheckRouter';
import {QrCodeRouter} from '@/pages/Erp/qrCode/qrCodeRouter';
import ProducttionLayout from '@/pages/Production';

const ProductionRouterConfig = [
  {
    path: '/production',
    name: '生产管理',
    component: ProducttionLayout,
    children:[
      ...ToolRouter,
      ...QualityCheckRouter,
      ...QrCodeRouter,
      {
        redirect: '/production/tool',
      }
    ]
  }
];
export default ProductionRouterConfig;
