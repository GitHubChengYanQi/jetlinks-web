import ReSeachLayout from '@/pages/ReSearch';
import {ResearchBomRouter} from '@/pages/ReSearch/ResearchBom/route';

const ResearchRouterConfig = [
  {
    path: '/research',
    name: '产研管理',
    component: ReSeachLayout,
    children:[
      ...ResearchBomRouter,
      {
        redirect: '/research/researchBom',
      }
    ]
  }
];
export default ResearchRouterConfig;

