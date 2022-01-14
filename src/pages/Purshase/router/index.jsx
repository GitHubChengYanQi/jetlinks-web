import {PurchaseAskRouter} from '@/pages/Purshase/purchaseAsk/purchaseAskRouter';
import PurshaseLayout from '@/pages/Purshase';
import {SupplyListingRouter} from '@/pages/Purshase/Supply/router';
import {ToBuyPlanRouter} from '@/pages/Purshase/ToBuyPlan/router';
import {ProcurementPlanRouter} from '@/pages/Purshase/procurementPlan/procurementPlanRouter';
import {PurchaseQuotationRouter} from '@/pages/Purshase/purchaseQuotation/purchaseQuotationRouter';
import {ProcurementOrderRouter} from '@/pages/Purshase/procurementOrder/procurementOrderRouter';

const PurshaseRouterConfig = [
  {
    path: '/purchase',
    name: '采购管理',
    component: PurshaseLayout,
    children:[
      ...PurchaseAskRouter,
      ...SupplyListingRouter,
      ...ToBuyPlanRouter,
      ...ProcurementPlanRouter,
      ...PurchaseQuotationRouter,
      ...ProcurementOrderRouter,
      {
        redirect: '/purchase/supply',
      }
    ]
  }
];
export default PurshaseRouterConfig;
