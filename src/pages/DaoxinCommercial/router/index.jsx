
import {AdressRouter} from '@/pages/DaoxinClient/adress/adressRouter';
import {LalRouter} from '@/pages/DaoxinClient/lal/lalRouter';
import {Client} from '@/pages/DaoxinClient/client/clientRouter';
import {commercialRouter} from '@/pages/DaoxinCommercial/ commercial/ commercialRouter';
import CommercialSystem from '@/pages/DaoxinCommercial';



const CommercialRouterConfig = [
  {
    path: '/COMMERCIAL_SYSTEM_',
    name: '商机管理',
    component: CommercialSystem,

    children:[
      ...commercialRouter,


      {

        redirect: '/COMMERCIAL_SYSTEM_/commercial',
      }

    ]
  }
];

export default CommercialRouterConfig;
