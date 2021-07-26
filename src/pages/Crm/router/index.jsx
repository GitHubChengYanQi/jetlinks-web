
import {AdressRouter} from '@/pages/DaoXinClient/adress/adressRouter';
import {CustomerRouter} from '@/pages/DaoXinClient/client/clientRouter';
import {ContactsRouter} from '@/pages/DaoXinClient/contacts/contactsRouter';
import {ContactsRouterEdit} from '@/pages/DaoXinClient/contacts/contactsRouter/edit';
import CrmLayout from '@/pages/Crm';
import {BusinessRouter} from '@/pages/DaoXinBusiness/business/businessRouter';
import {QuotationRouter} from '@/pages/DaoXinBusiness/quotation/quotationRouter';
import {SourceRouter} from '@/pages/DaoXinBusiness/source/sourceRouter';
import {ContractMachineRouter} from '@/pages/DaoxinContrac/contractMachine/contractMachineRouter';
import {TemplateRouter} from '@/pages/DaoxinContrac/template/templateRouter';
import {ContractRouter} from '@/pages/DaoxinContrac/contract/contractRouter';


const CrmRouterConfig = [
  {
    path: '/CRM',
    name: '客户管理',
    component: CrmLayout,
    children:[
      ...AdressRouter,
      ...CustomerRouter,
      ...ContactsRouter,
      ...ContactsRouterEdit,
      ...BusinessRouter,
      ...QuotationRouter,
      ...SourceRouter,
      ...ContractMachineRouter,
      ...TemplateRouter,
      ...ContractRouter,
      {
        redirect: '/CRM/customer',
      }


    ]
  }
];
export default CrmRouterConfig;
