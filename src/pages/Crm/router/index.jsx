

import {ContactsRouter} from '@/pages/Crm/contacts/ContactsRouter';
import CrmLayout from '@/pages/Crm';
import {BusinessRouter} from '@/pages/Crm/business/BusinessRouter';
import {QuotationRouter, TrackRouter, trackRouter} from '@/pages/Crm/track/TrackRouter';
import {OriginRouter, originRouter, SourceRouter} from '@/pages/Crm/origin/OriginRouter';
import {TemplateRouter} from '@/pages/Crm/template/TemplateRouter';
import {ContractRouter} from '@/pages/Crm/contract/ContractRouter';
import {AdressRouter} from '@/pages/Crm/adress/AdressRouter';
import {OrderRouter} from '@/pages/Crm/order/OrderRouter';
import {OrderBranchRouter} from '@/pages/Crm/orderBranch/OrderBranchRouter';
import {CustomerRouter} from '@/pages/Crm/customer/CustomerRouter';
import {CrmCustomerLevelRouter} from '@/pages/Crm/crmCustomerLevel/crmCustomerLevelRouter';


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
      ...CrmCustomerLevelRouter,
      {
        redirect: '/CRM/customer',
      }
    ]
  }
];
export default CrmRouterConfig;
