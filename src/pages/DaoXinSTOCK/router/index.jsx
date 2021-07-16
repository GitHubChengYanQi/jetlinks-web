
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoXinSTOCK/place/placeRouter';
import STOCKSystem from '@/pages/DaoXinSTOCK';
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
      ...LogisticsRouter,
      ...OrderRouter,
      ...OutboundRouter,
      {
        redirect: '/STOCK_SYSTEM/stock',
      }
    ]
  }
];

export default STOCKRouterConfig;
