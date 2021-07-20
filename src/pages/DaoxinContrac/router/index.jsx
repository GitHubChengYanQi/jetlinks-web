
import {StockDetailsRouter} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsRouter';
import {StockRouter} from '@/pages/DaoXinSTOCK/stock/stockRouter';
import {PlaceRouter} from '@/pages/DaoXinSTOCK/place/placeRouter';


import StockSystem from '@/pages/DaoXinSTOCK';
import {InstockRouter} from '@/pages/DaoXinSTOCK/instock/instockRouter';
import {DeliveryRouter} from '@/pages/DaoXinSTOCK/delivery/deliveryRouter';
import ContracSystem from '@/pages/DaoxinContrac';
import {ContractMachineRouter} from '@/pages/DaoxinContrac/contractMachine/contractMachineRouter';

const ContracRouterConfig = [{


    path: '/CONTRAC_SYSTEM',
    name: '设置',
    component: ContracSystem,
    children:[
      ...ContractMachineRouter,
      {
        redirect: '/CONTRAC_SYSTEM/contractMachine',
      }




    ]
  }
];

export default ContracRouterConfig;
