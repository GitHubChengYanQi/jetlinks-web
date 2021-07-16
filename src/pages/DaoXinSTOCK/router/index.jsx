import BomSystem from '@/pages/DaoxinBOM';
import {MaterialRouter} from '@/pages/DaoxinBOM/material/materialRouter';
import {ItemsRouter} from '@/pages/DaoxinBOM/items/itemsRouter';
import {BrandRouter} from '@/pages/DaoxinBOM/brand/brandRouter';
import {PartsRouter} from '@/pages/DaoxinBOM/parts/partsRouter';
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoXinSTOCK/place/placeRouter';
import STOCKSystem from '@/pages/DaoXinSTOCK';
import {ClientRouter} from '@/pages/DaoXinSTOCK/client/clientRouter';
import {LogisticsRouter} from '@/pages/DaoXinSTOCK/logistics/logisticsRouter';
import {OrderRouter} from '@/pages/DaoXinSTOCK/order/orderRouter';
import {OutboundRouter} from '@/pages/DaoXinSTOCK/outbound/outboundRouter';

const STOCKRouterConfig = [
  {
    path: '/STOCK_SYSTEM',
    name: '设置',
    component: STOCKSystem,
    children:[
      ...StockDetailsRouter,
      ...StockRouter,
      ...PlaceRouter,
      ...ClientRouter,
      ...LogisticsRouter,
      ...OrderRouter,
      ...OutboundRouter,
    ]
  }
];

export default STOCKRouterConfig;
