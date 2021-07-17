
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoXinSTOCK/place/placeRouter';
import STOCKSystem from '@/pages/DaoXinSTOCK';
import {DeliveryRouter} from '@/pages/DaoXinSTOCK/delivery/deliveryRouter';
import {InstockRouter} from '@/pages/DaoXinSTOCK/instock/instockRouter';

const STOCKRouterConfig = [
  {
    path: '/STOCK_SYSTEM',
    name: '设置',
    component: STOCKSystem,
    children:[
      ...StockDetailsRouter,
      ...StockRouter,
      ...PlaceRouter,
      ...DeliveryRouter,
      ...InstockRouter,
      {
        redirect: '/STOCK_SYSTEM/stock',
      }
    ]
  }
];

export default STOCKRouterConfig;
