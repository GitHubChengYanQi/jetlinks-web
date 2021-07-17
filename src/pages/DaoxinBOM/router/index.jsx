import BomSystem from '@/pages/DaoxinBOM';
import {MaterialRouter} from '@/pages/DaoxinBOM/material/materialRouter';
import {ItemsRouter} from '@/pages/DaoxinBOM/items/itemsRouter';
import {BrandRouter} from '@/pages/DaoxinBOM/brand/brandRouter';
import {PartsRouter} from '@/pages/DaoxinBOM/parts/partsRouter';

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
      {
        redirect: '/BOM/items',
      }
    ]
  }
];

export default bomRouterConfig;
