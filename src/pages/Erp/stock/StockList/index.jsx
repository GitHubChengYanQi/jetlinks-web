/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import {Tree} from 'antd';
import {storehouse} from '../StockUrl';
import {useRequest} from '@/util/Request';
import ListLayout from '@/layouts/ListLayout';
import StockTable from '@/pages/Erp/stock/components/StockTable';
import Select from '@/components/Select';

const StockList = () => {

  const {data, run} = useRequest({url: '/storehouse/list', method: 'POST'});

  const Storehouse = data ? data.map((values) => {
    return {
      title: values.name,
      key: values.storehouseId,
    };
  }) : [];

  const [value, setValue] = useState();


  const [state, setState] = useState();

  const Left = () => {
    return (
      <>
        <Select
          api={storehouse}
          placeholder="搜索仓库"
          width="100%"
          value={value}
          bordered={false}
          onChange={async (value) => {
            await run(
              {
                data: {
                  storehouseId: value
                }
              }
            );
            setValue(value);
          }} />
        <Tree
          showLine
          onSelect={(value) => {
            setState(value);
          }}
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '所有仓库',
              key: '',
              children: Storehouse
            },
          ]}
        />
      </>);
  };
  return (
    <ListLayout>
      <StockTable left={Left()} state={state} />
    </ListLayout>
  );
};

export default StockList;
