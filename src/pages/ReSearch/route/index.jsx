import ReSeachLayout from '@/pages/ReSearch';
import {ResearchBomRouter} from '@/pages/ReSearch/ResearchBom/route';
import {SopRouter} from '@/pages/ReSearch/sop/sopRouter';

const ResearchRouterConfig = [
  {
    path: '/research',
    name: '产研管理',
    component: ReSeachLayout,
    children:[
      ...ResearchBomRouter,
      ...SopRouter,
      {
        redirect: '/research/researchBom',
      }
    ]
  }
];
export default ResearchRouterConfig;

