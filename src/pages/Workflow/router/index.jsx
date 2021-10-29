import {lazy} from 'react';


const WorkflowConfig = [
  {
    path: '/workflow',
    name: '流程管理',
    component: lazy(() => import('../WorkFlow.jsx')),
  }
];
export default WorkflowConfig;
