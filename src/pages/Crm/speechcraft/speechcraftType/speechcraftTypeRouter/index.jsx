/**
 * 话术分类路由文件
 *
 * @author 
 * @Date 2021-09-13 13:00:15
 */

import React, {lazy} from 'react';

export const SpeechcraftTypeRouter = [
  {
    path: '/speechcraftType',
    component: lazy(() => import('../speechcraftTypeList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
