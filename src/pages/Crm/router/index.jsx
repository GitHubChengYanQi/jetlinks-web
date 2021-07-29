

import {ContactsRouter} from '@/pages/DaoXinCustomer/contacts/ContactsRouter';
import CrmLayout from '@/pages/Crm';
import {BusinessRouter} from '@/pages/DaoXinBusiness/business/BusinessRouter';
import {QuotationRouter, TrackRouter, trackRouter} from '@/pages/DaoXinBusiness/track/TrackRouter';
import {OriginRouter, originRouter, SourceRouter} from '@/pages/DaoXinBusiness/origin/OriginRouter';
import {ContractMachineRouter} from '@/pages/DaoxinContrac/contractMachine/ContractMachineRouter';
import {TemplateRouter} from '@/pages/DaoxinContrac/template/TemplateRouter';
import {ContractRouter} from '@/pages/DaoxinContrac/contract/ContractRouter';
import {AdressRouter} from '@/pages/DaoXinCustomer/adress/AdressRouter';
import {OrderRouter} from '@/pages/DaoxinOrder/order/OrderRouter';
import {OrderBranchRouter} from '@/pages/DaoxinOrder/orderBranch/OrderBranchRouter';
import {CustomerRouter} from '@/pages/DaoXinCustomer/customer/CustomerRouter';


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
      ...TrackRouter,
      ...OriginRouter,
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
