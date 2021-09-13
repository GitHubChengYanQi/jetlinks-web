/**
 * 话术分类详细路由文件
 *
 * @author cheng
 * @Date 2021-09-13 15:24:19
 */

import React, {lazy} from 'react';

export const SpeechcraftTypeDetailRouter = [
  {
    path: '/speechcraftTypeDetail',
    component: lazy(() => import('../speechcraftTypeDetailList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
