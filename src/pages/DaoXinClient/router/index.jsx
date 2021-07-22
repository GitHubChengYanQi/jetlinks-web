
import {AdressRouter} from '@/pages/DaoXinClient/adress/adressRouter';
import {ClientRouter} from '@/pages/DaoXinClient/client/clientRouter';
import {ContactsRouter} from '@/pages/DaoXinClient/contacts/contactsRouter';
import ClientSystem from '@/pages/DaoXinClient';


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
