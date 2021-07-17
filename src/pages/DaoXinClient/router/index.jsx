import ClientSystem from '@/pages/DaoxinClient';
import {AdressRouter} from '@/pages/DaoxinClient/adress/adressRouter';
import {LalRouter} from '@/pages/DaoxinClient/lal/lalRouter';
import {Client} from '@/pages/DaoxinClient/client/clientRouter';


const ClientRouterConfig = [
  {
    path: '/CLIENT_SYSTEM',
    name: '用户系统',
    component: ClientSystem,
    children:[
      ...AdressRouter,
      ...Client,
      ...LalRouter,

      {

        redirect: '/CLIENT_SYSTEM/client',
      }

    ]
  }
];

export default ClientRouterConfig;
