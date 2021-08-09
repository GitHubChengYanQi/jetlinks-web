

import CrmLayout from '@/pages/Crm';
import {BusinessRouter} from '@/pages/Crm/business/BusinessRouter';
import {QuotationRouter, TrackRouter, trackRouter} from '@/pages/Crm/track/TrackRouter';
import {OriginRouter, originRouter, SourceRouter} from '@/pages/Crm/origin/OriginRouter';
import {TemplateRouter} from '@/pages/Crm/template/TemplateRouter';
import {ContractRouter} from '@/pages/Crm/contract/ContractRouter';
import {CustomerRouter} from '@/pages/Crm/customer/CustomerRouter';
import {CrmCustomerLevelRouter} from '@/pages/Crm/customer/crmCustomerLevel/crmCustomerLevelRouter';
import {CrmIndustryRouter} from '@/pages/Crm/crmIndustry/crmIndustryRouter';
import {ContactsRouter} from '@/pages/Crm/contacts/ContactsRouter';


const CrmRouterConfig = [
  {
    path: '/CRM',
    name: 'CRM',
    component: CrmLayout,
    children:[
      ...CustomerRouter,
      ...BusinessRouter,
      ...TrackRouter,
      ...OriginRouter,
      ...TemplateRouter,
      ...ContractRouter,
      ...CrmCustomerLevelRouter,
      ...CrmIndustryRouter,
      ...ContactsRouter,
      {
        redirect: '/CRM/customer',
      }
    ]
  }
];
export default CrmRouterConfig;
