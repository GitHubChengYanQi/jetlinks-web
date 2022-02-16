import ReSeachLayout from '@/pages/ReSearch';

const ResearchRouterConfig = [
  {
    path: '/research',
    name: '产研管理',
    component: ReSeachLayout,
    children:[
      // ...ResearchBomRouter,
      // ...SopRouter,
      // ...ShipSetpRouter,
      {
        redirect: '/research/researchBom',
      }
    ]
  }
];
export default ResearchRouterConfig;

