
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoXinSTOCK/place/placeRouter';


import StockSystem from '@/pages/DaoXinSTOCK';
import {InstockRouter} from '@/pages/DaoXinSTOCK/instock/instockRouter';
import {DeliveryRouter} from '@/pages/DaoXinSTOCK/delivery/deliveryRouter';

const bomRouterConfig = [{


    path: '/STOCK_SYSTEM',
    name: '设置',
    component: StockSystem,
    children:[
      ...PlaceRouter,
      ...StockRouter,
      ...StockDetailsRouter,
      ...InstockRouter,
      ...DeliveryRouter,
      {

        redirect: '/STOCK_SYSTEM/stock',
      }




    ]
  }
];

export default bomRouterConfig;
