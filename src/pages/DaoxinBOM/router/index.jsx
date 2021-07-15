import BomSystem from '@/pages/DaoxinBOM';
import {MaterialRouter} from '@/pages/DaoxinBOM/material/materialRouter';
import {ItemsRouter} from '@/pages/DaoxinBOM/items/itemsRouter';
import {BrandRouter} from '@/pages/DaoxinBOM/brand/brandRouter';
import {PartsRouter} from '@/pages/DaoxinBOM/parts/partsRouter';
import {StockDetailsRouter} from '@/pages/DaoxinBOM/stockDetails/stockDetailsRouter';
import {StockRouter} from '@/pages/DaoxinBOM/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoxinBOM/place/placeRouter';

const bomRouterConfig = [
  {
    path: '/BOM',
    name: '设置',
    component: BomSystem,
    children:[
      ...MaterialRouter,
      ...ItemsRouter,
      ...BrandRouter,
      ...PartsRouter,
      ...StockDetailsRouter,
      ...StockRouter,
      ...PlaceRouter,
    ]
  }
];

export default bomRouterConfig;
