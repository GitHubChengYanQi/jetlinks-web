
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoXinSTOCK/place/placeRouter';


import StockSystem from '@/pages/DaoXinSTOCK';
import {InstockRouter} from '@/pages/DaoXinSTOCK/instock/instockRouter';
import {DeliveryRouter} from '@/pages/DaoXinSTOCK/delivery/deliveryRouter';
import ContracSystem from '@/pages/DaoxinContrac';
import {ContractMachineRouter} from '@/pages/DaoxinContrac/contractMachine/contractMachineRouter';
import {TemplateRouter} from '@/pages/DaoxinContrac/template/templateRouter';
import {ContractRouter} from '@/pages/DaoxinContrac/contract/contractRouter';

const ContracRouterConfig = [{


    path: '/CONTRAC_SYSTEM',
    name: '设置',
    component: ContracSystem,
    children:[
      ...ContractMachineRouter,
      ...TemplateRouter,
      ...ContractRouter,
      {
        redirect: '/CONTRAC_SYSTEM/contractMachine',
      }




    ]
  }
];

export default ContracRouterConfig;
