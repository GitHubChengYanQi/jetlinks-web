
import {AdressRouter} from '@/pages/DaoXinClient/adress/adressRouter';
import {ContactsRouter} from '@/pages/DaoXinClient/contacts/contactsRouter';
import {ContactsRouterEdit} from '@/pages/DaoXinClient/contacts/contactsRouter/edit';
import CrmLayout from '@/pages/Crm';


const ErpRouterConfig = [
  {
    path: '/ERP',
    name: '客户管理',
    component: CrmLayout,
    children:[
      ...AdressRouter,
      ...ContactsRouter,
      ...ContactsRouterEdit,
      {
        redirect: '/ERP/client',
      }


    ]
  }
];
export default ErpRouterConfig;
