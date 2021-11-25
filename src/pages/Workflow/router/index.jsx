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
    name: '流程管理',
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
