



import CrmLayout from '@/pages/Crm';
import {MaterialRouter} from '@/pages/DaoxinBOM/material/MaterialRouter';
import {ItemsRouter} from '@/pages/DaoxinBOM/items/ItemsRouter';
import {BrandRouter} from '@/pages/DaoxinBOM/brand/BrandRouter';
import {PartsRouter} from '@/pages/DaoxinBOM/parts/PartsRouter';
import {PlaceRouter, StorehouseRouter} from '@/pages/DaoXinSTOCK/storehouse/StorehouseRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/StockRouter';
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/StockDetailsRouter';
import {InstockRouter} from '@/pages/DaoXinSTOCK/instock/InstockRouter';
import {OutstockRouter} from '@/pages/DaoXinSTOCK/outstock/OutstockRouter';
import ErpLayout from '@/pages/Erp';


const ErpRouterConfig = [
  {
    path: '/ERP',
    name: '物品库存管理',
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
      {
        redirect: '/ERP/items',
      }


    ]
  }
];
export default ErpRouterConfig;
