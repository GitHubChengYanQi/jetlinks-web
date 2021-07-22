
import ClientSystem from '@/pages/DaoxinClient';
import {AdressRouter} from '@/pages/DaoxinClient/adress/adressRouter';
import {ClientRouter} from '@/pages/DaoxinClient/client/clientRouter';
import {ContactsRouter} from '@/pages/DaoxinClient/contacts/contactsRouter';

const ClientRouterConfig = [
  {
    path: '/CLIENT_SYSTEM',
    name: '客户管理',
    component: ClientSystem,
    children:[
      ...AdressRouter,
      ...ClientRouter,
      ...ContactsRouter,

      {
        redirect: '/CLIENT_SYSTEM/client',
      }


    ]
  }
];
export default ClientRouterConfig;
