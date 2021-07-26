
import {AdressRouter} from '@/pages/DaoXinClient/adress/adressRouter';
import {ClientRouter} from '@/pages/DaoXinClient/client/clientRouter';
import {ContactsRouter} from '@/pages/DaoXinClient/contacts/contactsRouter';
import {ContactsRouterEdit} from '@/pages/DaoXinClient/contacts/contactsRouter/edit';
import CrmLayout from '@/pages/Crm';


const CrmRouterConfig = [
  {
    path: '/CRM',
    name: '客户管理',
    component: CrmLayout,
    children:[
      ...AdressRouter,
      ...ClientRouter,
      ...ContactsRouter,
      ...ContactsRouterEdit,
      {
        redirect: '/CRM/client',
      }
    ]
  }
];
export default CrmRouterConfig;
