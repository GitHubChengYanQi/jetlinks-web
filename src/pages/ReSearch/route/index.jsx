import ReSeachLayout from '@/pages/ReSearch';
import {ResearchBomRouter} from '@/pages/ReSearch/ResearchBom/route';
import {SopRouter} from '@/pages/ReSearch/sop/sopRouter';
import {ShipSetpRouter} from '@/pages/ReSearch/shipSetp/shipSetpRouter';

const ResearchRouterConfig = [
  {
    path: '/research',
    name: '产研管理',
    component: ReSeachLayout,
    children:[
      ...ResearchBomRouter,
      ...SopRouter,
      ...ShipSetpRouter,
      {
        redirect: '/research/researchBom',
      }
    ]
  }
];
export default ResearchRouterConfig;

