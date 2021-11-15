import {lazy} from 'react';


const FormConfig = [
  {
    path: '/form',
    name: '表单管理',
    component: lazy(() => import('../DiyForm.jsx')),
  }
];
export default FormConfig;
