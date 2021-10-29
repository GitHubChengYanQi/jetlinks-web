import {RepairRouter} from '@/pages/Repair/repair/repairRouter';
import RepairLayout from '@/pages/Repair';

const RepairRouterConfig = [
  {
    path: '/REPAIR',
    name: '售后管理',
    component: RepairLayout,
    children:[
      ...RepairRouter,
      {
        redirect: '/REPAIR/repair',
      }
    ]
  }
];
export default RepairRouterConfig;

