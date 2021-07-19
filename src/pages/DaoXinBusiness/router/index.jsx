import BomSystem from '@/pages/DaoxinBOM';
import {MaterialRouter} from '@/pages/DaoxinBOM/material/materialRouter';
import {ItemsRouter} from '@/pages/DaoxinBOM/items/itemsRouter';
import {BrandRouter} from '@/pages/DaoxinBOM/brand/brandRouter';
import {PartsRouter} from '@/pages/DaoxinBOM/parts/partsRouter';
import BusinessSystem from '@/pages/DaoXinBusiness';
import {BusinessRouter} from '@/pages/DaoXinBusiness/business/businessRouter';
import {QuotationRouter} from '@/pages/DaoXinBusiness/quotation/quotationRouter';
import {SourceRouter} from '@/pages/DaoXinBusiness/source/sourceRouter';


const BusinessRouterConfig = [
  {
    path: '/BUSINESS_SYSTEM',
    name: '设置',
    component: BusinessSystem,
    children:[
      ...BusinessRouter,
      ...QuotationRouter,
      ...SourceRouter,
      {
        redirect: '/BUSINESS_SYSTEM/business',
      }

    ]
  }
];

export default BusinessRouterConfig;
