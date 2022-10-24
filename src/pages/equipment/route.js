import {lazy} from 'react';
import BaseSystem from '@/pages/BaseSystem';

const equipmentConfig = [
  {
    path: '/equipment',
    name: '设备管理',
    component: BaseSystem,
    children: [
      {
        path: '/equipment',
        name: '设备管理',
        component: lazy(() => import('@/pages/equipment/Equipment')),
      },  {
        path: '/grouping',
        name: '设备分组',
        iconfont: 'icon-yonghuguanli',
        component: lazy(() => import('@/pages/equipment/Grouping')),
      }, {
        path: '/edition',
        name: '版本管理',
        component: lazy(() => import('@/pages/equipment/Edition')),
      },
      {
        path: '/inStock',
        name: '入库管理',
        iconfont: 'icon-yonghuguanli',
        component: lazy(() => import('@/pages/equipment/InStock')),
      },
      {
        path: '/outStock',
        name: '出库管理',
        component: lazy(() => import('@/pages/equipment/OutStock')),
      },
      {
        path: '/category',
        name: '设备类别管理',
        component: lazy(() => import('@/pages/equipment/Category')),
      },
      {
        path: '/model',
        name: '设备型号管理',
        component: lazy(() => import('@/pages/equipment/Model')),
      },
      {
        path: '/firmware',
        name: '固件管理',
        component: lazy(() => import('@/pages/equipment/Firmware')),
      },
      {
        path: '/batch',
        name: '批次管理',
        component: lazy(() => import('@/pages/equipment/Batch')),
      },
    ]
  },
];
export default equipmentConfig;
