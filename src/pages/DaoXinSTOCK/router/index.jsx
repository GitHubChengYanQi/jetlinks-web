
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoXinSTOCK/place/placeRouter';

import {LogisticsRouter} from '@/pages/DaoXinSTOCK/logistics/logisticsRouter';
import {OrderRouter} from '@/pages/DaoXinSTOCK/order/orderRouter';
import {OutboundRouter} from '@/pages/DaoXinSTOCK/outbound/outboundRouter';

import StockSystem from '@/pages/DaoXinSTOCK';

const bomRouterConfig = [{


    path: '/STOCK_SYSTEM',
    name: '设置',
    component: StockSystem,
    children:[
      ...LogisticsRouter,
      ...OrderRouter,
      ...OutboundRouter,
      ...PlaceRouter,
      ...StockRouter,
      ...StockDetailsRouter,


   //   ...BrandRouter,
    //  ...ItemsRouter,
    //  ...MaterialRouter,


    ]
  }
];

export default bomRouterConfig;
