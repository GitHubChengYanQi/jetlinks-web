/**
 * 出库清单路由文件
 *
 * @author cheng
 * @Date 2021-09-15 11:15:44
 */

import React, {lazy} from 'react';

export const OutstockListingRouter = [
  {
    path: '/outstockListing',
    component: lazy(() => import('../outstockListingList')),
    fallback: <div>loading...</div>,
    exact: true,
  }
];
