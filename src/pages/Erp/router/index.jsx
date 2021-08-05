



import CrmLayout from '@/pages/Crm';
import {MaterialRouter} from '@/pages/Erp/material/MaterialRouter';
import {ItemsRouter} from '@/pages/Erp/items/ItemsRouter';
import {BrandRouter} from '@/pages/Erp/brand/BrandRouter';
import {PartsRouter} from '@/pages/Erp/parts/PartsRouter';
import {PlaceRouter, StorehouseRouter} from '@/pages/Erp/storehouse/StorehouseRouter';
import {StockRouter} from '@/pages/Erp/stock/StockRouter';
import {StockDetailsRouter} from '@/pages/Erp/stockDetails/StockDetailsRouter';
import {InstockRouter} from '@/pages/Erp/instock/InstockRouter';
import {OutstockRouter} from '@/pages/Erp/outstock/OutstockRouter';
import ErpLayout from '@/pages/Erp';
import {ErpPackageRouter} from "@/pages/Erp/erpPackage/erpPackageRouter";
import {OrderRouter} from "@/pages/Crm/order/OrderRouter";


const ErpRouterConfig = [
  {
    path: '/ERP',
    name: '产品库存管理',
    component: ErpLayout,
    children:[
      ...OutstockRouter,
      ...MaterialRouter,
      ...ItemsRouter,
      ...BrandRouter,
      ...PartsRouter,
      ...StorehouseRouter,
      ...StockRouter,
      ...StockDetailsRouter,
      ...InstockRouter,
      ...OrderRouter,
      ...ErpPackageRouter,
      {
        redirect: '/ERP/items',
      }


    ]
  }
];
export default ErpRouterConfig;
