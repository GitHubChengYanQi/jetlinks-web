



import CrmLayout from '@/pages/Crm';
import {MaterialRouter} from '@/pages/DaoxinBOM/material/materialRouter';
import {ItemsRouter} from '@/pages/DaoxinBOM/items/itemsRouter';
import {BrandRouter} from '@/pages/DaoxinBOM/brand/brandRouter';
import {PartsRouter} from '@/pages/DaoxinBOM/parts/partsRouter';
import {PlaceRouter, StorehouseRouter} from '@/pages/DaoXinSTOCK/storehouse/storehouseRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/stockRouter';
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsRouter';
import {InstockRouter} from '@/pages/DaoXinSTOCK/instock/instockRouter';
import {OutstockRouter} from '@/pages/DaoXinSTOCK/outstock/outstockRouter';
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
