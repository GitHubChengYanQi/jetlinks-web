


import {MaterialRouter} from '@/pages/Erp/material/MaterialRouter';
import {ItemsRouter} from '@/pages/Erp/items/ItemsRouter';
import {BrandRouter} from '@/pages/Erp/brand/BrandRouter';
import {PartsRouter} from '@/pages/Erp/parts/PartsRouter';
import { StorehouseRouter} from '@/pages/Erp/storehouse/StorehouseRouter';
import {StockRouter} from '@/pages/Erp/stock/StockRouter';
import {InstockRouter} from '@/pages/Erp/instock/InstockRouter';
import {OutstockRouter} from '@/pages/Erp/outstock/OutstockRouter';
import ErpLayout from '@/pages/Erp';
import {OrderBranchRouter} from '@/pages/Erp/orderBranch/OrderBranchRouter';
import {OrderRouter} from '@/pages/Erp/order/OrderRouter';
import {PackageRouter} from '@/pages/Erp/package/packageRouter';
import {DeliveryRouter} from '@/pages/Erp/delivery/deliveryRouter';
import {SpuRouter} from '@/pages/Erp/spu/spuRouter';
import {ProductOrderRouter} from '@/pages/Erp/productOrder/productOrderRouter';
import {ToolRouter} from '@/pages/Erp/tool/toolRouter';
import {QualityCheckRouter} from '@/pages/Erp/qualityCheck/qualityCheckRouter';
import ProducttionLayout from '@/pages/PRODUCTION';
import {OrCodeBindRouter} from '@/pages/Erp/orCodeBind/orCodeBindRouter';

const ProductionRouterConfig = [
  {
    path: '/PRODUCTTION',
    name: '生产管理',
    component: ProducttionLayout,
    children:[
      ...ToolRouter,
      ...QualityCheckRouter,
      ...ProductOrderRouter,
      ...OrCodeBindRouter,
      {
        redirect: '/PRODUCTTION/tool',
      }
    ]
  }
];
export default ProductionRouterConfig;
