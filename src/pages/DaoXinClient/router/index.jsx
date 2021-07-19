import ClientSystem from '@/pages/DaoXinClient';
import {AdressRouter} from '@/pages/DaoXinClient/adress/adressRouter';
import {LalRouter} from '@/pages/DaoXinClient/lal/lalRouter';
import {Client} from '@/pages/DaoXinClient/client/clientRouter';


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
