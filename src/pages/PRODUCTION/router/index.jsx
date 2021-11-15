import {ToolRouter} from '@/pages/Erp/tool/toolRouter';
import {QualityCheckRouter} from '@/pages/Erp/qualityCheck/qualityCheckRouter';
import SpuLayout from '@/pages/SPU';
import {QrCodeRouter} from '@/pages/Erp/qrCode/qrCodeRouter';
import ProducttionLayout from '@/pages/Production';

const ProductionRouterConfig = [
  {
    path: '/production',
    name: '产品物料',
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
