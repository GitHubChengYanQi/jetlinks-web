import React, { lazy } from 'react';
import BaseSystem from '@/pages/BaseSystem';
import { GenRouter } from '@/pages/BaseSystem/gen/GenRouter';
import { LoginLogRouter } from '@/pages/BaseSystem/loginLog/loginLogRouter';
import { SysDeptRouter } from '@/pages/BaseSystem/sysDept/sysDeptRouter';
import ClientSystem from '@/pages/DaoxinClient';

const systemConfig = [
  {
    path: '/BASE_SYSTEM',
    name: '设置',
    component: ClientSystem,
    children: [

      ...SysDeptRouter,
      ...LoginLogRouter,
      ...GenRouter,
      {
        redirect: '/CLIENT_SYSTEM/client',
      }
    ]
  },
];
export default systemConfig;
