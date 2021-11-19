import {lazy} from 'react';
import SpuLayout from '@/pages/SPU';
import {SkuRouter} from '@/pages/Erp/sku/skuRouter';
import {PackageRouter} from '@/pages/Erp/package/packageRouter';
import {PartsRouter} from '@/pages/Erp/parts/PartsRouter';
import {SPUSRouter} from '@/pages/Erp/Spus/spuRouter';
import {ProcessRouter} from '@/pages/Workflow/Process/processRouter';
import WorkflowLayout from '@/pages/Workflow';


const WorkflowConfig = [
  // {
  //   path: '/workflow',
  //   name: '审批管理',
  //   component: lazy(() => import('../WorkFlow.jsx')),
  // },
  {
    path: '/workflow',
    name: '审批管理',
    component: WorkflowLayout,
    children:[
      ...ProcessRouter,
      {
        redirect: '/workflow/process',
      }
    ]
  }
];
export default WorkflowConfig;
