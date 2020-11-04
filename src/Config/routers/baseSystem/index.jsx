import  {lazy} from 'react';

const systemConfig = [
  {
    path: '/BASE_SYSTEM',
    component: lazy(() => import('@/pages/BaseSystem')),
    exact: true,
  },
];
export default systemConfig;
