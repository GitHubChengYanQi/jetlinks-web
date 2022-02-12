
import {PartsRouter} from '@/pages/Erp/parts/PartsRouter';
import {PackageRouter} from '@/pages/Erp/package/packageRouter';
import SpuLayout from '@/pages/SPU';
import {SkuRouter} from '@/pages/Erp/sku/skuRouter';
import {SPUSRouter} from '@/pages/Erp/Spus/spuRouter';
import {ResearchBomRouter} from '@/pages/ReSearch/ResearchBom/route';
import {SopRouter} from '@/pages/ReSearch/sop/sopRouter';
import {ShipSetpRouter} from '@/pages/ReSearch/shipSetp/shipSetpRouter';

const SpuRouterConfig = [
  {
    path: '/SPU',
    name: '产品物料',
    component: SpuLayout,
    children:[
      ...SkuRouter,
      ...PackageRouter,
      ...PartsRouter,
      ...SPUSRouter,
      ...ResearchBomRouter,
      ...SopRouter,
      ...ShipSetpRouter,
      {
        redirect: '/SPU/sku',
      }
    ]
  }
];
export default SpuRouterConfig;
