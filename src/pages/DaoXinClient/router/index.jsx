

import ClientSystem from '@/pages/DaoXinClient';
import {ClientRouter} from '@/pages/DaoXinClient/client/clientRouter';

const ClientRouterConfig = [
  {
    path: '/client_system',
    name: '设置',
    component: ClientSystem,
    children:[
      ...ClientRouter,
    ]
  }
];

export default ClientRouterConfig;
