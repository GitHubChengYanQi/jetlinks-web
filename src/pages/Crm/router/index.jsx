

import {CustomerRouter} from '@/pages/DaoXinClient/client/clientRouter';
import {ContactsRouter} from '@/pages/DaoXinClient/contacts/contactsRouter';
import CrmLayout from '@/pages/Crm';
import {BusinessRouter} from '@/pages/DaoXinBusiness/business/businessRouter';
import {QuotationRouter} from '@/pages/DaoXinBusiness/quotation/quotationRouter';
import {SourceRouter} from '@/pages/DaoXinBusiness/source/sourceRouter';
import {ContractMachineRouter} from '@/pages/DaoxinContrac/contractMachine/contractMachineRouter';
import {TemplateRouter} from '@/pages/DaoxinContrac/template/templateRouter';
import {ContractRouter} from '@/pages/DaoxinContrac/contract/contractRouter';
import {AdressRouter} from '@/pages/DaoXinClient/adress/adressRouter';
import {OrderRouter} from '@/pages/DaoxinOrder/order/orderRouter';
import {OrderBranchRouter} from '@/pages/DaoxinOrder/orderBranch/orderBranchRouter';


const CrmRouterConfig = [
  {
    path: '/CRM',
    name: 'CRM',
    component: CrmLayout,
    children:[
      ...OrderRouter,
      ...OrderBranchRouter,
      ...AdressRouter,
      ...CustomerRouter,
      ...ContactsRouter,
      ...BusinessRouter,
      ...QuotationRouter,
      ...SourceRouter,
      ...TemplateRouter,
      ...ContractRouter,
      ...ContractMachineRouter,
      {
        redirect: '/CRM/customer',
      }
    ]
  }
];
export default CrmRouterConfig;
