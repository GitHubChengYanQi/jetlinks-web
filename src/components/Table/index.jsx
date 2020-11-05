import React from 'react';
import {Table as AntdTable} from 'antd';
import { useEva, createAsyncActions, createEffects } from 'react-eva';

import style from './index.module.less';

const Table = ({children, actions, effects}) => {

  const { implementActions, dispatch } = useEva({ actions, effects });

  return (
    <div className={style.tableWarp}>
      <AntdTable>
        {children}
      </AntdTable>
    </div>
  );
};

export default Table;
